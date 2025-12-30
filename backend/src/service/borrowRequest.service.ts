import { Request } from "express";
import AppDataSource from "../config/db.config";
import { BORROWER_STATUS, STATUS_CODE } from "../constant/enum";
import { Auth } from "../entities/auth.enity";
import { Bill } from "../entities/bill.entity";
import Book from "../entities/book.entity";
import { BorrowRequest } from "../entities/borrow_request.entity";
import Library from "../entities/library.entity";
import User from "../entities/user.entity";
import { AuthRequest } from "../interface/auth.Interface";
import { billPrice, borrowDaysDiff } from "../utils/billUtils";
import messages from "../utils/message";
import { getPagingData, validatePagination } from "../utils/pegniation";

class BorrowRequestService {
  private borrowRequestRepository = AppDataSource.getRepository(BorrowRequest);
  private bookRepository = AppDataSource.getRepository(Book);
  private userRepository = AppDataSource.getRepository(User);
  private libraryRepository = AppDataSource.getRepository(Library);
  private authRepository = AppDataSource.getRepository(Auth);
  private billARepository = AppDataSource.getRepository(Bill);

  async create(req: AuthRequest) {
    try {
      const { bookId, libraryId, startDate, endDate } = req.body;

      const authId = req.user?.id;

      const book = await this.bookRepository.findOneBy({ id: bookId });

      const user = await this.userRepository.findOne({
        where: { auth: { id: authId } },
        relations: ["auth"], // include auth details if needed
      });

      const library = await this.libraryRepository.findOneBy({ id: libraryId });

      if (!book) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages?.errorMessages?.notFound,
        };
      }

      if (!user) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages?.errorMessages?.notFound,
        };
      }

      if (!library) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages?.errorMessages?.notFound,
        };
      }

      // find if the user alresy requested for the book and avoid requestion for the same book
      const existingRequest = await this.borrowRequestRepository.findOne({
        where: {
          book: { id: bookId },
          user: { id: user.id },
          status: BORROWER_STATUS.PENDING || BORROWER_STATUS.BORROWED,
        },
      });

      if (existingRequest) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: messages?.errorMessages?.borrow?.alreadyBorrowed,
        };
      }

      if (book?.availableCopies <= 0) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: messages?.errorMessages?.book?.notAvailable,
        };
      }

      const borrowRequest = this.borrowRequestRepository.create({
        book: bookId,
        user: user,
        library: libraryId,
        startDate,
        endDate,
      });

      await this.borrowRequestRepository.save(borrowRequest);

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        message: messages?.successMessages?.borrowRequest?.create,
      };
    } catch (error) {
      console.log("🚀 ~ create: ~ error:", error);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages?.errorMessages?.serverError,
      };
    }
  }

  async getAllByUser(req: AuthRequest) {
    try {
      const [page, perpage] = validatePagination(
        req.query.page as string,
        req.query.limit as string
      );

      const searchQuery = req.query.search;
      const status = req.query.status;
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;
      const authId = req?.user?.id;

      console.log("🚀 ~ getAllByUser: ~ searchQuery:", searchQuery);

      // Step 1: Get userId from auth table
      const auth = await this.authRepository.findOne({
        where: { id: authId },
        relations: ["user"],
      });

      const userId = auth?.user?.id;

      if (!auth || !auth.user) {
        return {
          code: STATUS_CODE.UNAUTHORIZED,
          status: false,
          message: "User not found from auth record.",
        };
      }

      // Step 2: Fetch borrow requests for that user
      const borrowRequests = await this.borrowRequestRepository
        .createQueryBuilder("borrow_request")
        .addSelect([
          "borrow_request.id",
          "borrow_request.status",
          "borrow_request.startDate",
          "borrow_request.endDate",
        ])
        .leftJoin("borrow_request.book", "book")
        .addSelect([
          "book.id",
          "book.title",
          "book.author",
          "book.description",
          "book.price",
        ])
        .leftJoinAndSelect("book.genre", "genre")
        .leftJoinAndSelect("book.category", "category")
        .leftJoinAndSelect("book.coverImage", "coverImage")

        .leftJoin("borrow_request.library", "library")
        .addSelect(["library.id", "library.name"])
        .leftJoin("borrow_request.bill", "bill")
        .addSelect(["bill.id"])
        .where("borrow_request.user_id = :userId", { userId })
        .orderBy("borrow_request.createdAt", "DESC");

      if (searchQuery) {
        borrowRequests.andWhere("book.title ILIKE :search", {
          search: `%${searchQuery}%`,
        });
      }

      if (status) {
        borrowRequests.andWhere("borrow_request.status = :status", { status });
      }

      if (startDate && endDate) {
        borrowRequests.andWhere(
          "borrow_request.startDate >= :startDate AND borrow_request.endDate <= :endDate",
          { startDate, endDate }
        );
      }

      const [book, count] = await borrowRequests
        .limit(perpage)
        .offset((page - 1) * perpage)
        .getManyAndCount();

      const pagination = getPagingData(count, page, perpage);

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data: book,
        pagination,
      };
    } catch (error) {
      console.log("🚀 ~ getAll: ~ error:", error);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages?.errorMessages?.serverError,
      };
    }
  }

  async updateStatus(req: Request) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const borrowRequest = await this.borrowRequestRepository.findOne({
        where: { id },
        relations: ["book", "user", "library"], // load necessary relations
      });

      if (borrowRequest?.status === BORROWER_STATUS.BORROWED) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: "Book already borrowed.",
        };
      }

      if (!borrowRequest) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages?.errorMessages?.notFound,
        };
      }

      const book = borrowRequest.book;
      if (!book) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: "Associated book not found",
        };
      }

      if (status === BORROWER_STATUS.BORROWED) {
        if (book.availableCopies <= 0) {
          return {
            code: STATUS_CODE.BAD_REQUEST,
            status: false,
            message: "No available copies to borrow.",
          };
        }

        book.availableCopies -= 1;

        const daysDiff = borrowDaysDiff({
          startDate: borrowRequest.startDate,
          endDate: borrowRequest.endDate,
        });

        const { price: totalAmount } = billPrice({
          borrowDays: daysDiff,
          bookPrice: book.price,
        });

        const newBill = this.billARepository.create({
          book: book,
          borrowRequest: borrowRequest,
          user: borrowRequest.user,
          library: borrowRequest.library,
          startDate: borrowRequest.startDate.toISOString().substring(0, 10),
          endDate: borrowRequest.endDate.toISOString().substring(0, 10),
          daysBorrowed: daysDiff,
          totalAmount,
          pricePerDay: book.price,
          grandTotal: totalAmount,
        });

        await this.billARepository.save(newBill);
      } else if (status === BORROWER_STATUS.RETURNED) {
        book.availableCopies += 1;
      } else if (status === BORROWER_STATUS.REJECTED) {
      }
      borrowRequest.status = status;
      // Save updates
      await this.bookRepository.save(book);
      await this.borrowRequestRepository.save(borrowRequest);

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        message: messages?.successMessages?.borrowRequest?.update,
      };
    } catch (error) {
      console.error("UpdateStatus error:", error);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages?.errorMessages?.serverError,
      };
    }
  }

  
}

export default new BorrowRequestService();