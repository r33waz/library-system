import moment from "moment";
import cron from "node-cron";
import { LessThan } from "typeorm";
import AppDataSource from "../config/db.config";
import { BORROWER_STATUS } from "../constant/enum";
import { BorrowRequest } from "../entities/borrow_request.entity";

export const borrowDaysDiff = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const startData = moment(startDate);
  const endData = moment(endDate);
  return endData.diff(startData, "days");
};

// Utility: Bill price
export const billPrice = ({
  borrowDays,
  bookPrice,
}: {
  borrowDays: number;
  bookPrice: number;
}) => ({
  price: borrowDays * bookPrice,
});

// Utility: Penalty
export function calculatePenalty({
  totalAmount,
  endDate,
}: {
  totalAmount: number;
  endDate: string;
}) {
  const penaltyRate = 0.02;
  const returnDate = moment(endDate);
  const today = moment();

  if (today.isAfter(returnDate)) {
    const overdueDays = today.diff(returnDate, "days");
    return overdueDays * (totalAmount * penaltyRate);
  }

  return 0;
}

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running the overdue check cron job...");
    const today = moment().format("YYYY-MM-DD");
    const overDueCheckRequest = await AppDataSource.getRepository(
      BorrowRequest
    ).find({
      where: { status: BORROWER_STATUS.BORROWED, endDate: LessThan(today) },
      relations: ["book"],
    });

    for (const borrowRequest of overDueCheckRequest) {
      const { id, startDate, endDate, book } = borrowRequest;

      const borrowDays = borrowDaysDiff({ startDate, endDate });
      const totalAmount = billPrice({
        borrowDays,
        bookPrice: book.price,
      }).price;
      const penaltyAmount = calculatePenalty({ totalAmount, endDate });

      console.log(
        `BorrowRequest ID ${id} is overdue. Penalty: ₹${penaltyAmount.toFixed(
          2
        )}`
      );
    }
  } catch (error) {}
});
