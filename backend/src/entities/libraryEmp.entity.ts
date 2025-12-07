import "reflect-metadata";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { BLOCK_STATUS, ROLES, SIGNUPSTATUS } from "../constant/enum";
import { Auth } from "./auth.enity";
import Library from "./library.entity";
import Media from "./media.entity";
@Entity("library_emp")
export class LibraryEmp extends BaseEntity {
  @Column({ name: "first_name" })
  firstname: string;

  @Column({ name: "middle_name", nullable: true })
  middlename: string;

  @Column({ name: "last_name" })
  lastname: string;

  @Column({ name: "phone_number", default: null })
  phoneNumber: string;

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
    default: ROLES.LIBRARY_EMP,
  })
  role: ROLES;

  @Column({
    name: "blocked",
    type: "enum",
    enum: BLOCK_STATUS,
    default: BLOCK_STATUS.ACTIVE,
  })
  blocked: BLOCK_STATUS;

  @OneToOne(() => Media, (media) => media.employeePic, { onDelete: "CASCADE" })
  employeePic: Media;

  @ManyToOne(() => Library, (library) => library.employees, {
    onDelete: "CASCADE",
  })
  library: Library;

  @OneToOne(() => Auth, (auth) => auth.libraryEmp)
  auth: Auth;
}
