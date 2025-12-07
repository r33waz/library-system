import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import BaseEntity from "../constant/base.entity";
import Book from "./book.entity";
import User from "./user.entity";

@Entity("wishlist")
@Unique(["userId", "bookId"])
// prevents user from adding same book twice
class WishList extends BaseEntity {
  // Explicitly define the userId and bookId columns
  @Column()
  userId: string;

  @Column()
  bookId: string;

  @ManyToOne(() => User, (user) => user.wishlist, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Book, (book) => book.wishlistedBy, { onDelete: "CASCADE" })
  @JoinColumn({ name: "bookId" })
  book: Book;
}

export default WishList;
