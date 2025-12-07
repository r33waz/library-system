import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { BORROWER_STATUS } from "../constant/enum";
import { Book } from "./book.entity";
import { Library } from "./library.entity";
import { User } from "./user.entity";
import { Bill } from "./bill.entity";

@Entity("borrow_request")
export class BorrowRequest extends BaseEntity {
  @ManyToOne(() => Book)
  @JoinColumn({ name: "book_id" })
  book: Book;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Library)
  @JoinColumn({ name: "library_id" })
  library: Library;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({
    type: "enum",
    enum: BORROWER_STATUS,
    default: BORROWER_STATUS.PENDING,
  })
  status: BORROWER_STATUS;

  @OneToOne(() => Bill, (bill) => bill.borrowRequest)
  bill: Bill;
}
