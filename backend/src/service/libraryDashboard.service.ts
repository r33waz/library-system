import moment from "moment";
import { Between } from "typeorm";
import AppDataSource from "../config/db.config";
import { BORROWER_STATUS, STATUS_CODE } from "../constant/enum";
import { Auth } from "../entitys/auth.enity";
import Book from "../entitys/book.entity";
import { BorrowRequest } from "../entitys/borrow_request.entity";
import { AuthRequest } from "../interface/auth.Interface";
import messages from "../utils/message";
import { getFromCache, setToCache } from "../utils/redisClient";

class LibraryDashboardService {
  private bookRepository = AppDataSource.getRepository(Book);
  private borrowRequestRepository = AppDataSource.getRepository(BorrowRequest);
  private authRepository = AppDataSource.getRepository(Auth);

  async LibraryStast(req: AuthRequest) {
    const authId = req.user?.id;
    console.log(
      "🚀 ~ LibraryDashboardService ~ LibraryStast ~ authId:",
      authId
    );

    const library = await this.authRepository
      .createQueryBuilder("auth")
      .leftJoinAndSelect("auth.library", "library")
      .leftJoinAndSelect("auth.libraryEmp", "libraryEmp")
      .leftJoinAndSelect("libraryEmp.library", "libraryId")
      .where("auth.id = :id", { id: authId })
      .getOne();
    console.log(
      "🚀 ~ LibraryDashboardService ~ LibraryStast ~ library:",
      library
    );

    let libraryId: string | undefined;

    if (library) {
      libraryId = library?.library?.id || library?.libraryEmp?.library?.id;
    }

    console.log(
      "🚀 ~ LibraryDashboardService ~ LibraryStast ~ libraryId:",
      libraryId
    );

    const { fromDate: startDate, toDate: endDate } = req.query;

    const cacheKey = `dashboard:${libraryId}:${startDate ?? "all"}-${
      endDate ?? "all"
    }`;

    try {
      // Try to get from cache first

      // Build date filter if dates exist
      let whereDateRange: any = { library: { id: libraryId } };

      if (startDate && endDate) {
        const start = moment(startDate as string, "YYYY-MM-DD", true).toDate();
        const end = moment(endDate as string, "YYYY-MM-DD", true)
          .endOf("day")
          .toDate();
        whereDateRange.createdAt = Between(start, end);
      }
      // else no createdAt filter → get all data for library

      const books = await this.bookRepository.count({ where: whereDateRange });
      console.log(
        "🚀 ~ LibraryDashboardService ~ LibraryStast ~ books:",
        books
      );

      const borrowRequests = await this.borrowRequestRepository.count({
        where: whereDateRange,
      });
      console.log(
        "🚀 ~ LibraryDashboardService ~ LibraryStast ~ borrowRequests:",
        borrowRequests
      );

      const pendingBorrowRequests = await this.borrowRequestRepository.count({
        where: { ...whereDateRange, status: BORROWER_STATUS.PENDING },
      });
      console.log(
        "🚀 ~ LibraryDashboardService ~ LibraryStast ~ pendingBorrowRequests:",
        pendingBorrowRequests
      );

      const acceptedBorrowRequests = await this.borrowRequestRepository.count({
        where: { ...whereDateRange, status: BORROWER_STATUS.BORROWED },
      });
      console.log(
        "🚀 ~ LibraryDashboardService ~ LibraryStast ~ acceptedBorrowRequests:",
        acceptedBorrowRequests
      );

      const overdueBorrowRequests = await this.borrowRequestRepository.count({
        where: { ...whereDateRange, status: BORROWER_STATUS.OVERDUE },
      });
      console.log(
        "🚀 ~ LibraryDashboardService ~ LibraryStast ~ overdueBorrowRequests:",
        overdueBorrowRequests
      );

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data: {
          books,
          borrowRequests,
          pendingBorrowRequests,
          acceptedBorrowRequests,
          overdueBorrowRequests,
        },
      };
    } catch (error) {
      console.error("🚀 ~ LibraryStast ~ error:", error);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: "Internal Server Error",
      };
    }
  }

  async LibraryBorrowerStast(req: AuthRequest) {
    const authId = req?.user?.id;
    const fromDate = req?.query?.fromDate;
    const toDate = req?.query?.toDate;

    try {
      const library = await this.authRepository
        .createQueryBuilder("auth")
        .leftJoinAndSelect("auth.library", "library")
        .leftJoinAndSelect("auth.libraryEmp", "libraryEmp")
        .where("auth.id = :id", { id: authId })
        .getOne();

      let libraryId: string | undefined;

      if (library?.id) {
        libraryId = library?.library?.id || library?.libraryEmp?.library?.id;
      }

      const redisKey = `libraryBorrowerStast:${libraryId}`;
      const cached = await getFromCache(redisKey);
      if (cached) {
        return {
          code: STATUS_CODE.SUCCESS,
          status: true,
          data: cached,
        };
      }

      const query = this.borrowRequestRepository
        .createQueryBuilder("borrow_request")
        .select("DATE(borrow_request.createdAt)", "date")
        .addSelect("COUNT(*)", "count")
        .where("borrow_request.library_id = :id", { id: libraryId })
        .andWhere("borrow_request.status = :status", {
          status: BORROWER_STATUS.BORROWED,
        });

      if (fromDate) {
        query.andWhere("borrow_request.createdAt >= :fromDate", { fromDate });
      }

      if (toDate) {
        query.andWhere("borrow_request.createdAt <= :toDate", { toDate });
      }

      const result = await query
        .groupBy("DATE(borrow_request.createdAt)")
        .orderBy("date", "ASC")
        .getRawMany();

      const data = result.map((r) => ({
        date: r.date,
        count: Number(r.count),
      }));

      await setToCache(redisKey, data);

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data,
      };
    } catch (error) {
      console.error("🚀 ~ LibraryBorrowerStast ~ error:", error);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages?.errorMessages?.serverError,
      };
    }
  }

  async LibraryGenreDistribution(req: AuthRequest) {
    const authId = req?.user?.id;
    try {
      const library = await this.authRepository
        .createQueryBuilder("auth")
        .leftJoinAndSelect("auth.library", "library")
        .leftJoinAndSelect("auth.libraryEmp", "libraryEmp")
         .leftJoinAndSelect("libraryEmp.library", "libraryId")
        .where("auth.id = :id", { id: authId })
        .getOne();

      let libraryId: string | undefined;

      console.log(
        "🚀 ~ LibraryDashboardService ~ LibraryGenreDistribution ~ library:",
        library
      );
      if (library) {
        libraryId = library?.library?.id || library?.libraryEmp?.library?.id;
      }

      const redisKey = `libraryGenreDistribution:${libraryId}`;
      const cached = await getFromCache(redisKey);
      if (cached) {
        return {
          code: STATUS_CODE.SUCCESS,
          status: true,
          data: cached,
        };
      }

      const genreDistribution = await this.bookRepository
        .createQueryBuilder("book")
        .leftJoinAndSelect("book.genre", "genre")
        .leftJoinAndSelect("book.library", "library")
        .where("library.id = :id", { id: libraryId })
        .select("genre.name", "genre")
        .addSelect("COUNT(*)", "count")
        .groupBy("genre.name")
        .getRawMany();

      console.log(
        "🚀 ~ LibraryDashboardService ~ LibraryGenreDistribution ~ genreDistribution:",
        genreDistribution
      );

      const data = genreDistribution.map((row) => ({
        genre: row.genre,
        count: Number(row.count),
      }));

      // expire in 1 hour
      await setToCache(redisKey, data, 3600);

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data: data,
      };
    } catch (error) {
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages?.errorMessages?.serverError,
      };
    }
  }

  async LibraryCatergoryDistribution(req: AuthRequest) {
    try {
      const authId = req?.user?.id;
      const library = await this.authRepository
        .createQueryBuilder("auth")
        .leftJoinAndSelect("auth.library", "library")
        .leftJoinAndSelect("auth.libraryEmp", "libraryEmp")
        .leftJoinAndSelect("libraryEmp.library","libraryid")
        .where("auth.id = :id", { id: authId })
        .getOne();

      let libraryId: string | undefined;

      if (library?.id) {
        libraryId = library?.library?.id || library?.libraryEmp?.library?.id;
      }

      const redisKey = `libraryCatergoryDistribution:${libraryId}`;
      const cached = await getFromCache(redisKey);
      if (cached) {
        return {
          code: STATUS_CODE.SUCCESS,
          status: true,
          data: cached,
        };
      }

      const categoryDistribution = await this.bookRepository
        .createQueryBuilder("book")
        .leftJoinAndSelect("book.category", "category")
        .leftJoinAndSelect("book.library", "library")
        .where("library.id = :id", { id: libraryId })
        .select("category.name", "category")
        .addSelect("COUNT(*)", "count")
        .groupBy("category.name")
        .getRawMany();

      const data = categoryDistribution.map((row) => ({
        category: row.category,
        count: Number(row.count),
      }));

      await setToCache(redisKey, data, 3600);
      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data: data,
      };
    } catch (error) {
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages?.errorMessages?.serverError,
      };
    }
  }

  // library borrw request stat according to date filter for barchart
  async LibraryBorrowRequestStat(req: AuthRequest) {
    try {
      const authId = req?.user?.id;
      const fromDate = req?.query.fromDate;
      const endDate = req?.query?.endDate;

      // finding the library
    } catch (error) {}
  }
}

export default new LibraryDashboardService();
