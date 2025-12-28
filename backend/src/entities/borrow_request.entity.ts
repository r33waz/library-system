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
@Index("IDX_BORROW_REQUEST_USER", ["user"])
@Index("IDX_BORROW_REQUEST_BOOK", ["book"])
@Index("IDX_BORROW_REQUEST_LIBRARY", ["library"])
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

  @OneToOne(() => Bill, (bill) => bill.borrowRequest, {
    cascade: true,
    onDelete: "CASCADE",
  })
  bill: Bill;
}
