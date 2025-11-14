import { Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import Book from "./book.entity";
import User from "./user.entity";

@Entity("rating")
export class Rating extends BaseEntity {

  @ManyToOne(() => Book)
  @JoinColumn()
  book: Book;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}

export default Rating;
