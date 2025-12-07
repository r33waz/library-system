import { Column, Entity, ManyToMany, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import Book from "./book.entity";
import Media from "./media.entity";

@Entity("category")
class Category extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @ManyToMany(() => Book, (book) => book.category)
  book: Book[];

  @OneToOne(() => Media, (media) => media.categoryPic)
  categoryPic: Media;
}

export default Category;
