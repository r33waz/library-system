import moment from "moment";
import { Between } from "typeorm";
import AppDataSource from "../config/db.config";
import { BORROWER_STATUS, STATUS_CODE } from "../constant/enum";
import { Auth } from "../entities/auth.enity";
import Book from "../entities/book.entity";
import { BorrowRequest } from "../entities/borrow_request.entity";
import { AuthRequest } from "../interface/auth.Interface";
import messages from "../utils/message";
import { getFromCache, setToCache } from "../utils/redisClient";

class LibraryDashboardService {
  private bookRepository = AppDataSource.getRepository(Book);
  private borrowRequestRepository = AppDataSource.getRepository(BorrowRequest);
  private authRepository = AppDataSource.getRepository(Auth);

 
  private async getLibraryId(authId: string) {
    const library = await this.authRepository
      .createQueryBuilder("auth")
      .leftJoinAndSelect("auth.library", "library")
      .leftJoinAndSelect("auth.libraryEmp", "libraryEmp")
      .leftJoinAndSelect("libraryEmp.library", "libraryId")
      .where("auth.id = :id", { id: authId })
      .getOne();

    return library?.library?.id || library?.libraryEmp?.library?.id;
  }

  async LibraryStast(req: AuthRequest) {
    const authId = req.user?.id as string;
    const libraryId = await this.getLibraryId(authId);

    if (!libraryId) {
      return {
        code: STATUS_CODE.BAD_REQUEST,
        status: false,
        message: "Library not found",
      };
    }

    const { fromDate: startDate, toDate: endDate } = req.query;

    const cacheKey = `dashboard:${libraryId}:${startDate ?? "all"}-${
      endDate ?? "all"
    }`;

    try {
      let whereDateRange: any = { library: { id: libraryId } };

      if (startDate && endDate) {
        const start = moment(startDate as string, "YYYY-MM-DD", true).toDate();
        const end = moment(endDate as string, "YYYY-MM-DD", true)
          .endOf("day")
          .toDate();
        whereDateRange.createdAt = Between(start, end);
      }

      const books = await this.bookRepository.count({ where: whereDateRange });

      const borrowRequests = await this.borrowRequestRepository.count({
        where: whereDateRange,
      });

      const pendingBorrowRequests =
        await this.borrowRequestRepository.count({
          where: { ...whereDateRange, status: BORROWER_STATUS.PENDING },
        });

      const acceptedBorrowRequests =
        await this.borrowRequestRepository.count({
          where: { ...whereDateRange, status: BORROWER_STATUS.BORROWED },
        });

      const overdueBorrowRequests =
        await this.borrowRequestRepository.count({
          where: { ...whereDateRange, status: BORROWER_STATUS.OVERDUE },
        });

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
    const authId = req?.user?.id as string;
    const fromDate = req?.query?.fromDate;
    const toDate = req?.query?.toDate;

    try {
      const libraryId = await this.getLibraryId(authId);

      if (!libraryId) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: "Library not found",
        };
      }

      const redisKey = `libraryBorrowerStast:${libraryId}:${fromDate ?? "all"}:${
        toDate ?? "all"
      }`;

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
    const authId = req?.user?.id as string;

    try {
      const libraryId = await this.getLibraryId(authId);

      if (!libraryId) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: "Library not found",
        };
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

      const data = genreDistribution.map((row) => ({
        genre: row.genre,
        count: Number(row.count),
      }));

      await setToCache(redisKey, data, 3600);

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data,
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
      const authId = req?.user?.id as string;
      const libraryId = await this.getLibraryId(authId);

      if (!libraryId) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: "Library not found",
        };
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
        data,
      };
    } catch (error) {
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages?.errorMessages?.serverError,
      };
    }
  }

  async LibraryBorrowRequestStat(req: AuthRequest) {
    return {
      code: STATUS_CODE.BAD_REQUEST,
      status: false,
      message: "Feature not implemented yet",
    };
  }
}

export default new LibraryDashboardService();
