import {
  Column,
  Entity,
  Index,
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
@Index("IDX_BOOK_SLUG", ["slug"])
@Index("IDX_BOOK_LIBRARY", ["library"])
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  author: string;

  @Column()
  coverColor: string;

  @Column()
  description: string;

  @Column()
  totalCopies: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  price: number;

  @Column()
  availableCopies: number;

  @Column({ nullable: true })
  videoUrlNeplai: string;

  @Column({ nullable: true })
  videoUrlEnglish: string;

  @Column({ nullable: true })
  videoUrlHindi: string;

  @Column()
  summary: string;

  @OneToOne(() => Media, (media) => media.bookCoverImage, {
    onDelete: "CASCADE",
  })
  coverImage: Media;

  // Foreign key: A Book belongs to one Library
  @ManyToOne(() => Library, (library) => library.books, { onDelete: "CASCADE" })
  library: Library;

  @ManyToMany(() => Genre, (genre) => genre.book, { onDelete: "CASCADE" })
  @JoinTable({ name: "book_genre" })
  genre: Genre[];

  @ManyToMany(() => Category, (category) => category.book, {
    onDelete: "CASCADE",
  })
  @JoinTable({ name: "book_category" })
  category: Category[];

  @OneToMany(() => WishList, (wishlist) => wishlist.book, { cascade: true, onDelete: "CASCADE" })
  wishlistedBy: WishList[];

  @OneToMany(() => BorrowRequest, (borrow_req) => borrow_req.book, { cascade: true, onDelete: "CASCADE" })
  borrowedBy: BorrowRequest[];

  @OneToMany(() => Bill, (bill) => bill.book, { cascade: true, onDelete: "CASCADE" })
  bill: Bill[];
}

export default Book;
