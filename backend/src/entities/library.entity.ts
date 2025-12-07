import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { BLOCK_STATUS, ROLES, SIGNUPSTATUS } from "../constant/enum";
import { Auth } from "./auth.enity";
import { Bill } from "./bill.entity";
import Book from "./book.entity";
import { BorrowRequest } from "./borrow_request.entity";
import { LibraryEmp } from "./libraryEmp.entity";
import Media from "./media.entity";

@Entity("library")
export class Library extends BaseEntity {
  @Column({ name: "library_name" })
  name: string;

  @Column({ name: "library_description" })
  description: string;

  @Column({ name: "phone_number" })
  phoneNumber: string;

  @Column({ name: "city" })
  city: string;

  @Column({ name: "street" })
  street: string;

  @Column({ name: "state" })
  state: string;

  @OneToOne(() => Media, (media) => media.libraryProfile, {
    nullable: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  profilepic: Media;

  @Column({
    name: "status",
    type: "enum",
    enum: SIGNUPSTATUS,
    default: SIGNUPSTATUS.PENDING,
  })
  status: SIGNUPSTATUS;

  @Column({
    name: "role",
    type: "enum",
    enum: ROLES,
    default: ROLES.LIBRARY_ADMIN,
  })
  role: ROLES;

  @Column({
    name: "blocked",
    type: "enum",
    enum: BLOCK_STATUS,
    default: BLOCK_STATUS.ACTIVE,
  })
  blocked: BLOCK_STATUS;

  @OneToMany(() => Book, (book) => book.library, { cascade: true })
  books: Book[];

  @OneToMany(() => LibraryEmp, (employee) => employee.library)
  employees: LibraryEmp[];

  @OneToOne(() => Auth, (auth) => auth.library)
  auth: Auth;

  @OneToMany(() => BorrowRequest, (borrowRequest) => borrowRequest.library)
  borrowRequest: BorrowRequest[];

  @OneToMany(() => Bill, (bill) => bill.library)
  bill: Bill[];
}

export default Library;
