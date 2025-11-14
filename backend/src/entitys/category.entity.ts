import { Column, Entity, ManyToMany } from "typeorm";
import BaseEntity from "../constant/base.entity";
import Book from "./book.entity";

@Entity("category")
class Category extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @ManyToMany(() => Book, (book) => book.category)
  book: Book[];
}

export default Category;
