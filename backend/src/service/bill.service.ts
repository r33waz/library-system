import { Request } from "express";
import AppDataSource from "../config/db.config";
import { STATUS_CODE } from "../constant/enum";
import { Bill } from "../entitys/bill.entity";
import { AuthRequest } from "../interface/auth.Interface";
import messages from "../utils/message";

class BillService {
  private billRepository = AppDataSource.getRepository(Bill);

  async getAll() {}

  async getOneById(req: Request) {
    const { id } = req.params;
    console.log("🚀 ~ BillService ~ getOneById ~ id:", id);

    try {
      const bill = await this.billRepository
        .createQueryBuilder("bill")
        .leftJoinAndSelect("bill.user", "user")
        .leftJoinAndSelect("bill.book", "book")
        .leftJoinAndSelect("bill.library", "library")
        .select([
          "bill.id",
          "bill.startDate",
          "bill.endDate",
          "bill.daysBorrowed",
          "bill.pricePerDay",
          "bill.totalAmount",
          "bill.penaltyAmount",
          "bill.grandTotal",
          "bill.status",

          "book.id",
          "book.title",
          "book.author",
          // 'book.coverImage',

          // 'library.id',
          // 'library.library_name',
          // 'library.phone_number',
          // 'library.address'
        ])
        .where("bill.id = :id", { id })
        .andWhere("book.deleted_at IS NULL")
        .getOne();

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data: bill,
      };
    } catch (error) {
      console.log("🚀 ~ getOneById ~ error:", error);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages.serverError,
      };
    }
  }

  // get bills by user id
  async getBillsByUserId(req: AuthRequest) {
    const  id  = req.user?.id;
    console.log("🚀 ~ BillService ~ getBillsByUserId ~ id:", id);
    try {
      const bills = await this.billRepository
        .createQueryBuilder("bill")
        .leftJoinAndSelect("bill.user", "user")
        .leftJoinAndSelect("bill.book", "book")
        .leftJoinAndSelect("bill.library", "library")
        .select([
          "bill.id",
          "bill.startDate",
          "bill.endDate",
          "bill.daysBorrowed",
          "bill.pricePerDay",
          "bill.totalAmount",
          "bill.penaltyAmount",
          "bill.grandTotal",
          "bill.status",

          "book.id",
          "book.title",
          "book.author",
          // 'book.coverImage',

          // 'library.id',
          // 'library.library_name',
          // 'library.phone_number',
          // 'library.address'
        ])
        .where("user.id = :id", { id })
        .andWhere("book.deleted_at IS NULL")
        .getMany();

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data: bills,
      };
    } catch (error) {
      console.log("🚀 ~ getBillsByUserId ~ error:", error);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages.serverError,
      };
    }
  }
}

export default new BillService();
