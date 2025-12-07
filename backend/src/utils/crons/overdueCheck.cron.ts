import moment from "moment";
import cron from "node-cron";
import { LessThanOrEqual } from "typeorm";
import AppDataSource from "../../config/db.config";
import { BORROWER_STATUS } from "../../constant/enum";
import { Bill } from "../../entities/bill.entity";
import { BorrowRequest } from "../../entities/borrow_request.entity";
import { billPrice, borrowDaysDiff, calculatePenalty } from "../billUtils";

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running the overdue check cron job...");
    const today = moment().format("YYYY-MM-DD");
    const tomorrow = moment(today).add(1, "days").format("YYYY-MM-DD");
    const overDueCheckRequest = await AppDataSource.getRepository(
      BorrowRequest
    ).find({
      where: [
        {
          status: BORROWER_STATUS.BORROWED,
          endDate: LessThanOrEqual(tomorrow),
        },
        {
          status: BORROWER_STATUS.OVERDUE,
          endDate: LessThanOrEqual(today),
        },
      ],
      relations: ["book", "user"],
    });

    for (const borrowRequest of overDueCheckRequest) {
      const { id, startDate, endDate, book } = borrowRequest;

      const borrowDays = borrowDaysDiff({ startDate, endDate });
      const totalAmount = billPrice({
        borrowDays,
        bookPrice: book.price,
      }).price;
      const penaltyAmount = calculatePenalty({ totalAmount, endDate });
      // change status to overdue if the end date exceeds
      const updateBorrowRequest = await AppDataSource.getRepository(
        BorrowRequest
      );

      await updateBorrowRequest.update(id, {
        status: BORROWER_STATUS.OVERDUE,
      });

      const updateBill = await AppDataSource.getRepository(Bill);

      await updateBill.update(
        { borrowRequest: { id } }, // match by related BorrowRequest ID
        {
          penaltyAmount: penaltyAmount,
          grandTotal: totalAmount + penaltyAmount,
        }
      );

      console.log(
        `BorrowRequest ID ${id} is overdue. Penalty: ₹${penaltyAmount.toFixed(
          2
        )}`
      );
    }
  } catch (error) {
    console.log("error", error);
  }
});
