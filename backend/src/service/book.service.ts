import { Request } from "express";
import AppDataSource from "../config/db.config";
import { MEDIA_TYPE, STATUS_CODE } from "../constant/enum";
import { Auth } from "../entities/auth.enity";
import Book from "../entities/book.entity";
import messages from "../utils/message";
import { getPagingData, validatePagination } from "../utils/pegniation";
import {
  deleteFromCacheByPrefix,
  getFromCache,
  setToCache,
} from "../utils/redisClient";
import sendMail from "../utils/sendMail";
import { Slug } from "../utils/slugify";

class BookService {
  private authRepository = AppDataSource.getRepository(Auth);
  private bookRepository = AppDataSource.getRepository(Book);
  // create the book route

  async create(req: Request) {
    try {
      const {
        title,
        author,
        coverColor,
        description,
        totalCopies,
        availableCopies,
        neplaiVideoUrl,
        englishVideoUrl,
        hindiVideoUrl,
        summary,
        library,
        genre,
        media,
        price,
        category,
      } = req.body;

      const slug = Slug(title);

      const newBook = this.bookRepository.create({
        title,
        slug,
        author,
        coverColor,
        description,
        price,
        totalCopies,
        availableCopies,
        videoUrlNeplai: neplaiVideoUrl,
        videoUrlEnglish: englishVideoUrl,
        videoUrlHindi: hindiVideoUrl,
        summary,
        library,
        genre: genre?.map((id: string) => ({ id })),
        category: category?.map((id: string) => ({ id })),
      });
      if (media && media.mediaType === MEDIA_TYPE.COVER_IMAGE) {
        newBook.coverImage = media;
      }

      await this.bookRepository.save(newBook);

      deleteFromCacheByPrefix(`books:page=`); // Invalidate all book caches'

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        message: messages?.successMessages?.book.create,
      };
    } catch (error) {
      console.log("🚀 ~ create: ~ error:", error);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages?.serverError,
      };
    }
  }

  // get all the books
  async getAll(req: Request) {
    try {
      const [page, perpage] = validatePagination(
        req.query.page as string,
        req.query.limit as string
      );
      const search = req.query.search || "";
      const genre = req.query.genre;
      const category = req.query.category;

      // Generate the unique redis key for caching
      const redisKey = `books:page=${page}&limit=${perpage}&search=${search}&genre=${genre}&category=${category}`;

      // ✅ Step 1: Check Redis cache
      const cached = await getFromCache(redisKey);
      if (cached) {
        return {
          status: true,
          code: STATUS_CODE.SUCCESS,
          data: cached.books,
          pagination: cached.pagination,
        };
      }

      // ❌ Step 2: Cache miss, fetch from DB
      let idQuery = this.bookRepository
        .createQueryBuilder("book")
        .select("book.id");

      if (search)
        idQuery = idQuery.andWhere("book.title ILIKE :search", {
          search: `%${search}%`,
        });
      if (genre)
        idQuery = idQuery
          .leftJoin("book.genre", "genre")
          .andWhere("genre.name ILIKE :genre", { genre });
      if (category)
        idQuery = idQuery
          .leftJoin("book.category", "category")
          .andWhere("category.name ILIKE :category", { category });

      const [bookIds, count] = await idQuery
        .skip((page - 1) * perpage)
        .take(perpage)
        .getManyAndCount();
      const ids = bookIds.map((b) => b.id);

      if (!ids.length) {
        return {
          status: true,
          code: STATUS_CODE.SUCCESS,
          data: [],
          pagination: getPagingData(0, page, perpage),
        };
      }

      const books = await this.bookRepository
        .createQueryBuilder("book")
        .leftJoinAndSelect("book.genre", "genre")
        .leftJoinAndSelect("book.category", "category")
        .leftJoinAndSelect("book.coverImage", "coverImage")
        .leftJoin("book.library", "library")
        .addSelect(["library.id", "library.name", "library.phoneNumber"])
        .whereInIds(ids)
        .getMany();

      console.log("🚀 ~ getAll: ~ books:", books);

      const pagination = getPagingData(count, page, perpage);

      // ✅ Step 3: Cache the result
      await setToCache(redisKey, { books, pagination }, 60 * 5); // 5 minutes TTL

      return {
        status: true,
        code: STATUS_CODE.SUCCESS,
        data: books,
        pagination,
      };
    } catch (err) {
      console.error("❌ Error fetching books:", err);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages?.serverError,
      };
    }
  }

  // get single book
  async getOne(req: Request) {
    try {
      const { id } = req.params;
      const book = await this.bookRepository
        .createQueryBuilder("book")
        .leftJoinAndSelect("book.genre", "genre")
        .leftJoinAndSelect("book.category", "category")
        .leftJoin("book.library", "library")
        .addSelect(["library.id", "library.name", "library.phoneNumber"])
        .leftJoinAndSelect("library.auth", "auth")
        .addSelect("auth.email")
        .leftJoinAndSelect("book.coverImage", "coverImage")
        .where("book.id = :id", { id: id })
        .getOne();

      if (!book) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages?.errorMessages?.notFound,
        };
      }
      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data: book,
      };
    } catch (error) {
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages?.serverError,
      };
    }
  }

  // update boook
  async update(req: Request) {
    try {
      const { id } = req.params;
      const {
        title,
        author,
        coverColor,
        description,
        totalCopies,
        availableCopies,
        neplaiVideoUrl,
        englishVideoUrl,
        hindiVideoUrl,
        summary,
        media,
      } = req.body;

      const book = await this.bookRepository.findOneBy({ id: id });

      if (!book) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages?.errorMessages?.notFound,
        };
      } else {
        book.title = title ? title : book.title;
        book.author = author ? author : book.author;
        book.coverColor = coverColor ? coverColor : book.coverColor;
        book.description = description ? description : book.description;
        book.totalCopies = totalCopies ? totalCopies : book.totalCopies;
        book.availableCopies = availableCopies
          ? availableCopies
          : book.availableCopies;
      }

      if (media && media.mediaType === MEDIA_TYPE.COVER_IMAGE) {
        book.coverImage = media;
      }

      book.videoUrlNeplai = neplaiVideoUrl
        ? neplaiVideoUrl
        : book.videoUrlNeplai;

      book.videoUrlEnglish = englishVideoUrl
        ? englishVideoUrl
        : book.videoUrlEnglish;

      book.videoUrlHindi = hindiVideoUrl ? hindiVideoUrl : book.videoUrlHindi;

      book.summary = summary ? summary : book.summary;

      await this.bookRepository.save(book);

      return {
        code: STATUS_CODE.SUCCESS,
        status: false,
        message: messages?.successMessages?.book.update,
      };
    } catch (error) {
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages?.serverError,
      };
    }
  }

  // delete the book
  async delete(req: Request) {
    try {
      const { id } = req.params;

      // Check if the record exists before deletion
      const existingBook = await this.bookRepository.findOneBy({ id: id });

      if (!existingBook) {
        return {
          status: STATUS_CODE.NOT_FOUND,
          message: messages?.errorMessages?.notFound,
        };
      }

      // Perform the deletion
      await this.bookRepository.delete({ id });

      return {
        status: STATUS_CODE.SUCCESS,
        message: messages?.successMessages?.book.delete,
      };
    } catch (error) {
      return {
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: messages.errorMessages?.serverError,
      };
    }
  }

  // get latest book
  async latestBook(req: Request) {
    try {
      const books = await this.bookRepository
        .createQueryBuilder("book")
        .select([
          "book.id",
          "book.title",
          "book.author",
          "book.description",
          "book.slug",
        ])
        .leftJoinAndSelect("book.coverImage", "coverImage")
        .orderBy("book.created_at", "DESC")
        .limit(5)
        .getMany();
      console.log("🚀 ~ books:", books);
      return { code: STATUS_CODE.SUCCESS, status: true, data: books };
    } catch (error) {
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages?.serverError,
      };
    }
  }

  // get book by library
  async getBooksByLibrary(req: Request) {
    try {
      const { id } = req.params;
      const search = req.query.search;
      console.log("🚀 ~ getBooksByLibrary: ~ search:", search);
      const genre = req.query.genre;
      const category = req.query.category;
      const [page, perpage] = validatePagination(
        req.query.page as string,
        req.query.limit as string
      );
      const redisKey = `library:book:${id}?page=${req.query.page}&search=${req.query.search}&genre=${req.query.genre}&category=${req.query.category}`;
      const cached = await getFromCache(redisKey);
      if (cached) {
        return {
          status: true,
          code: STATUS_CODE.SUCCESS,
          data: cached.books,
          pagination: cached.pagination,
        };
      }

      let idQuery = this.bookRepository
        .createQueryBuilder("book")
        .select("book.id");

      if (search)
        idQuery = idQuery.andWhere("book.title ILIKE :search", {
          search: `%${search}%`,
        });
      if (genre)
        idQuery = idQuery
          .leftJoin("book.genre", "genre")
          .andWhere("genre.name ILIKE :genre", { genre });
      if (category)
        idQuery = idQuery
          .leftJoin("book.category", "category")
          .andWhere("category.name ILIKE :category", { category });

      const [bookIds, count] = await idQuery
        .skip((page - 1) * perpage)
        .take(perpage)
        .getManyAndCount();
      const ids = bookIds.map((b) => b.id);

      if (!ids.length) {
        return {
          status: true,
          code: STATUS_CODE.SUCCESS,
          data: [],
          pagination: getPagingData(0, page, perpage),
        };
      }

      const books = await this.bookRepository
        .createQueryBuilder("book")
        .leftJoinAndSelect("book.genre", "genre")
        .leftJoinAndSelect("book.category", "category")
        .leftJoin("book.library", "library")
        .leftJoinAndSelect("book.coverImage", "coverImage")
        .addSelect(["library.id", "library.name", "library.phoneNumber"])
        .where("library.id = :id", { id })
        .getMany();

      const pagination = getPagingData(count, page, perpage);

      // ✅ Step 3: Cache the result
      // await setToCache(redisKey, { books, pagination }, 60 * 5); // 5 minutes TTL

      return {
        status: true,
        code: STATUS_CODE.SUCCESS,
        data: books,
        pagination,
      };
    } catch (error) {
      console.log("🚀 ~ getBooksByLibrary: ~ error:", error);
      return {
        status: false,
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: messages.errorMessages?.serverError,
      };
    }
  }

  async sendLatestBook() {
    try {
      const books = await this.bookRepository
        .createQueryBuilder("book")
        .leftJoinAndSelect("book.genre", "genre")
        .leftJoinAndSelect("book.coverImage", "coverImage")
        .orderBy("book.created_at", "DESC")
        .limit(5)
        .getMany();

      if (!books.length) {
        throw new Error("No books found.");
      }

      const users = await this.authRepository
        .createQueryBuilder("auth")
        .select(["auth.id", "auth.email"])
        .leftJoin("auth.user", "user")
        .addSelect("user.role")
        .leftJoin("auth.admin", "admin")
        .addSelect("admin.role")
        .getMany();

      if (!users.length) {
        throw new Error("No users found.");
      }

      const recipientEmails = users.map((user) => user.email);
      const emailHTML = generateEmailHTML(books);
      const emailText = "Latest books";

      await sendMail(recipientEmails, emailText, emailHTML);
      return {
        status: STATUS_CODE.SUCCESS,
        message: "Latest books email sent successfully!",
        data: books,
      };
    } catch (error) {
      return {
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: messages.errorMessages?.serverError,
      };
    }
  }
}

const generateEmailHTML = (books: any[]) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Premium Library Newsletter</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Poppins', 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa; margin: 0; padding: 20px; color: #333333; -webkit-font-smoothing: antialiased;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 0; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);">
    <!-- Header Section -->
    <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); color: white; padding: 50px 20px; text-align: center; position: relative; overflow: hidden;">
      <!-- Dot Pattern Background -->
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'><circle cx=\'10\' cy=\'10\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'30\' cy=\'10\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'50\' cy=\'10\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'70\' cy=\'10\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'90\' cy=\'10\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'10\' cy=\'30\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'30\' cy=\'30\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'50\' cy=\'30\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'70\' cy=\'30\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'90\' cy=\'30\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'10\' cy=\'50\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'30\' cy=\'50\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'50\' cy=\'50\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'70\' cy=\'50\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'90\' cy=\'50\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'10\' cy=\'70\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'30\' cy=\'70\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'50\' cy=\'70\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'70\' cy=\'70\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'90\' cy=\'70\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'10\' cy=\'90\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'30\' cy=\'90\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'50\' cy=\'90\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'70\' cy=\'90\' r=\'2\' fill=\'white\' opacity=\'0.3\'/><circle cx=\'90\' cy=\'90\' r=\'2\' fill=\'white\' opacity=\'0.3\'/></svg>'); opacity: 0.4;"></div>
      
      <!-- Header Content -->
      <div style="position: relative; z-index: 1;">
        <div style="font-size: 48px; margin-bottom: 15px; display: inline-block; background: rgba(255, 255, 255, 0.2); width: 80px; height: 80px; line-height: 80px; border-radius: 50%; text-align: center; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">📚</div>
        <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; letter-spacing: 1px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">Literary Treasures</h1>
        <p style="margin: 15px 0 0; font-size: 16px; font-weight: 300; letter-spacing: 0.5px; max-width: 400px; margin-left: auto; margin-right: auto;">Discover our exquisite collection of handpicked literary masterpieces</p>
      </div>
    </div>
    
    <!-- Main Content -->
    <div style="padding: 40px 30px; position: relative;">
      <!-- Top Divider -->
      <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 80%; height: 1px; background: linear-gradient(to right, transparent, #e5e7eb 50%, transparent);"></div>
      
      <!-- Introduction -->
      <div style="text-align: center; margin-bottom: 40px; font-size: 16px; line-height: 1.7; color: #4b5563; padding: 0 15px;">
        <p style="margin-bottom: 0;">We're delighted to present our latest literary additions, carefully curated to inspire, entertain, and transport you to new worlds. Each title has been selected for its exceptional storytelling and unique perspective.</p>
      </div>
      
      <!-- Books Heading -->
      <h2 style="text-align: center; margin-bottom: 25px; font-family: 'Playfair Display', serif; font-size: 22px; color: #4c1d95; position: relative;">New Arrivals</h2>
      <div style="display: block; width: 60px; height: 3px; background: linear-gradient(to right, #7c3aed, #4f46e5); margin: 0 auto 30px; border-radius: 3px;"></div>
      
      <!-- Books Container -->
      <div style="margin-bottom: 30px;">
        ${books
          .map(
            (book, index) => `
            <div style="display: flex; flex-direction: column; background: #ffffff; margin-bottom: 25px; padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); border: 1px solid #f3f4f6; position: relative; overflow: hidden;">
              <!-- Top Border -->
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 5px; background: linear-gradient(to right, #7c3aed, #4f46e5);"></div>
              
              ${
                index === 0
                  ? '<div style="position: absolute; top: 10px; right: 10px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 5px 10px; font-size: 12px; font-weight: 600; text-transform: uppercase; border-radius: 20px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); letter-spacing: 0.5px; z-index: 1;">Featured</div>'
                  : ""
              }
              
              <!-- Book Image - Centered and Larger -->
              <div style="text-align: center; margin-bottom: 25px;">
                <img src="${
                  book.coverImage?.url || "https://via.placeholder.com/140x200"
                }" alt="${
              book.title
            }" style="width: 140px; height: 200px; object-fit: cover; border-radius: 10px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); border: 5px solid white; display: inline-block;" />
              </div>
              
              <!-- Book Info -->
              <div style="text-align: center;">
                <div style="font-size: 22px; font-weight: 600; color: #4c1d95; margin-bottom: 12px; line-height: 1.3;">${
                  book.title
                }</div>
                <div style="font-size: 14px; color: #6d28d9; display: inline-block; background-color: #f5f3ff; padding: 6px 14px; border-radius: 20px; font-weight: 500; letter-spacing: 0.3px; border: 1px solid #ede9fe; margin-bottom: 15px;">${
                  book.genre?.name || "General"
                }</div>
                
                <div style="font-size: 14px; color: #4b5563; line-height: 1.7; font-weight: 300; max-width: 450px; margin: 0 auto;">
                  ${
                    book.description
                      ? book.description.length > 100
                        ? `${book.description.slice(0, 100)}...`
                        : book.description
                      : "A captivating new addition to our collection that promises to take you on an unforgettable journey."
                  }
                </div>
              </div>
            </div>
            `
          )
          .join("")}
      </div>
      
      <!-- Divider -->
      <div style="height: 1px; background: linear-gradient(to right, transparent, #e5e7eb, transparent); margin: 40px 0; position: relative;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 0 15px; color: #7c3aed; font-size: 14px;">✦</div>
      </div>
      
      <!-- Call to Action -->
      <div style="text-align: center; margin: 40px 0 30px; padding: 10px;">
        <a href="https://yourlibrary.com/catalog" style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); color: white; text-decoration: none; padding: 16px 40px; border-radius: 30px; font-weight: 600; font-size: 16px; box-shadow: 0 5px 15px rgba(124, 58, 237, 0.3); letter-spacing: 0.5px; position: relative; overflow: hidden;">Explore Our Collection</a>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding: 40px 25px; background: linear-gradient(to bottom, #f9fafb, #f3f4f6); border-top: 1px solid #edf2f7; color: #6b7280; font-size: 14px; position: relative;">
      <!-- Top Border -->
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 5px; background: linear-gradient(to right, #7c3aed, #4f46e5);"></div>
      
      <!-- Footer Content -->
      <div style="margin-bottom: 20px; font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #4c1d95; letter-spacing: 1px;">Your Library</div>
      <div style="font-style: italic; color: #6b7280; margin-bottom: 20px;">Where stories come to life and imagination knows no bounds</div>
      
      <!-- Social Links -->
      <div style="margin: 25px 0;">
        <a href="#" style="display: inline-block; margin: 0 10px; color: #6b7280; text-decoration: none; background: white; width: 36px; height: 36px; line-height: 36px; border-radius: 50%; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); border: 1px solid #f3f4f6;">f</a>
        <a href="#" style="display: inline-block; margin: 0 10px; color: #6b7280; text-decoration: none; background: white; width: 36px; height: 36px; line-height: 36px; border-radius: 50%; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); border: 1px solid #f3f4f6;">t</a>
        <a href="#" style="display: inline-block; margin: 0 10px; color: #6b7280; text-decoration: none; background: white; width: 36px; height: 36px; line-height: 36px; border-radius: 50%; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); border: 1px solid #f3f4f6;">i</a>
        <a href="#" style="display: inline-block; margin: 0 10px; color: #6b7280; text-decoration: none; background: white; width: 36px; height: 36px; line-height: 36px; border-radius: 50%; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); border: 1px solid #f3f4f6;">p</a>
      </div>
      
      <!-- Footer Navigation -->
      <div style="margin: 20px 0;">
        <a href="#" style="display: inline-block; margin: 0 10px; color: #6b7280; text-decoration: none;">About Us</a> •
        <a href="#" style="display: inline-block; margin: 0 10px; color: #6b7280; text-decoration: none;">Catalog</a> •
        <a href="#" style="display: inline-block; margin: 0 10px; color: #6b7280; text-decoration: none;">Events</a> •
        <a href="#" style="display: inline-block; margin: 0 10px; color: #6b7280; text-decoration: none;">Contact</a>
      </div>
      
      <p style="margin: 15px 0;">Open Monday-Friday: 9am-8pm | Weekends: 10am-6pm</p>
      <p style="margin: 15px 0;">
        <a href="https://yourlibrary.com" style="color: #6d28d9; text-decoration: none; font-weight: 500;">Visit Our Website</a> | 
        <a href="#" style="color: #6d28d9; text-decoration: none; font-weight: 500;">Unsubscribe</a> | 
        <a href="#" style="color: #6d28d9; text-decoration: none; font-weight: 500;">Privacy Policy</a>
      </p>
      
      <!-- Copyright -->
      <div style="margin-top: 20px; font-size: 13px; color: #9ca3af;">
        © 2024 Your Library. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>`;
};

// cron.schedule("*/1 * * * *", async () => {
//   try {
//     console.log("Sending latest books email...");
//     await sendLatestBook();
//   } catch (error) {
//     console.error("Error in cron job:", error);
//   }
// });

// cron.schedule('0 0 */3 * *', async () => {
//   try {
//     console.log("Sending latest books email...");
//     await sendLatestBook();
//   } catch (error) {
//     console.error("Error in cron job:", error);
//   }
// });

export default new BookService();
