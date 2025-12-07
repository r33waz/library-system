import { Column, Entity, ManyToMany, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import Book from "./book.entity";
import Media from "./media.entity";
@Entity("genre")
class Genre extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @ManyToMany(() => Book, (book) => book.genre)
  book: Book[];

  @OneToOne(() => Media, (media) => media.genrePic)
  genrePic: Media;
}

export default Genre;
