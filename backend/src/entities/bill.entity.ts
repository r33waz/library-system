import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { BILL_STATUS } from "../constant/enum";
import { Book } from "./book.entity";
import { BorrowRequest } from "./borrow_request.entity";
import { Library } from "./library.entity";
import { User } from "./user.entity";

@Entity("bill")
export class Bill extends BaseEntity {
  @OneToOne(() => BorrowRequest, (borrowRequest) => borrowRequest.bill)
  @JoinColumn({ name: "borrow_request_id" })
  borrowRequest: BorrowRequest;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: "book_id" })
  book: Book;

  @ManyToOne(() => Library)
  @JoinColumn({ name: "library_id" })
  library: Library;

  @Column({ type: "date" })
  startDate: string;

  @Column({ type: "date" })
  endDate: string;

  @Column({ type: "int" })
  daysBorrowed: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  pricePerDay: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 2 ,default:0})
  penaltyAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  grandTotal: number;

  @Column({
    type: "enum",
    enum: BILL_STATUS,
    default: BILL_STATUS.UNPAID,
  })
  status: BILL_STATUS;
}
