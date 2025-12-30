import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import BaseEntity from "../constant/base.entity";
import { BORROWER_STATUS } from "../constant/enum";
import { Bill } from "./bill.entity";
import { Book } from "./book.entity";
import { Library } from "./library.entity";
import { User } from "./user.entity";

@Entity("borrow_request")
@Index("IDX_BR_USER_ID", ["user"])
@Index("IDX_BR_BOOK_ID", ["book"])
@Index("IDX_BR_LIBRARY_ID", ["library"])
@Index("IDX_BR_STATUS", ["status"])
@Index("IDX_BR_END_DATE", ["endDate"])
@Index("IDX_BR_DELETED_AT", ["deletedAt"])
export class BorrowRequest extends BaseEntity {

  @ManyToOne(() => Book, { onDelete: "CASCADE" })
  @JoinColumn({ name: "book_id" })
  book: Book;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Library, { onDelete: "CASCADE" })
  @JoinColumn({ name: "library_id" })
  library: Library;

  @Column({ type: "timestamp" })
  startDate: Date;

  @Column({ type: "timestamp" })
  endDate: Date;

  @Column({
    type: "enum",
    enum: BORROWER_STATUS,
    default: BORROWER_STATUS.PENDING,
  })
  status: BORROWER_STATUS;

  @Index("IDX_BR_BILL_ID")
  @OneToOne(() => Bill, (bill) => bill.borrowRequest, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "bill_id" })
  bill?: Bill;
}
