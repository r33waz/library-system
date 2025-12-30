import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { Bill } from "./bill.entity";
import { BorrowRequest } from "./borrow_request.entity";
import Category from "./category.entity";
import Genre from "./genre.entity";
import Library from "./library.entity";
import Media from "./media.entity";
import WishList from "./wishList.entity";

@Entity("book")
@Index("IDX_BOOK_LIBRARY_ID", ["library"])
@Index("IDX_BOOK_AUTHOR", ["author"])
@Index("IDX_BOOK_PRICE", ["price"])
@Index("IDX_BOOK_AVAILABLE_COPIES", ["availableCopies"])
@Index("IDX_BOOK_DELETED_AT", ["deletedAt"])
export class Book extends BaseEntity {

  @Column()
  title: string;

  // unique = automatically indexed
  @Column({ unique: true })
  slug: string;

  @Column()
  author: string;

  @Column()
  coverColor: string;

  @Column({ type: "text" })
  description: string;

  @Column()
  totalCopies: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  price: number;

  @Column()
  availableCopies: number;

  @Column({ nullable: true })
  videoUrlNeplai?: string;

  @Column({ nullable: true })
  videoUrlEnglish?: string;

  @Column({ nullable: true })
  videoUrlHindi?: string;

  @Column({ type: "text" })
  summary: string;

  @OneToOne(() => Media, (media) => media.bookCoverImage, {
    onDelete: "CASCADE",
  })
  coverImage: Media;

  // FK — indexed via decorator above
  @ManyToOne(() => Library, (library) => library.books, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "libraryId" })
  library: Library;

  // Join tables auto-index both sides
  @ManyToMany(() => Genre, (genre) => genre.book)
  @JoinTable({ name: "book_genre" })
  genre: Genre[];

  @ManyToMany(() => Category, (category) => category.book)
  @JoinTable({ name: "book_category" })
  category: Category[];

  // FK indexes live on the child tables
  @OneToMany(() => WishList, (wishlist) => wishlist.book, {
    cascade: true,
    onDelete: "CASCADE",
  })
  wishlistedBy: WishList[];

  @OneToMany(() => BorrowRequest, (borrow_req) => borrow_req.book, {
    cascade: true,
    onDelete: "CASCADE",
  })
  borrowedBy: BorrowRequest[];

  @OneToMany(() => Bill, (bill) => bill.book, {
    cascade: true,
    onDelete: "CASCADE",
  })
  bill: Bill[];
}

export default Book;
