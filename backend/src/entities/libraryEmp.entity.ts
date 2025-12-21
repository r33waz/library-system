import "reflect-metadata";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { ROLES } from "../constant/enum";
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
    name: "role",
    type: "enum",
    enum: ROLES,
    default: ROLES.LIBRARY_EMP,
  })
  role: ROLES;

  @Column({ name: "city" })
  city: string;

  @Column({ name: "street" })
  street: string;

  @Column({ name: "state" })
  state: string;

  // employee profile pic
  @OneToOne(() => Media, (media) => media.employeePic, { onDelete: "CASCADE" })
  employeePic: Media;

  // employee contract document
  @OneToOne(() => Media, (media) => media.employeePan, { onDelete: "CASCADE" })
  employeePan: Media;

  // employee citizenship document
  @OneToOne(() => Media, (media) => media.employeeCitizenship, {
    onDelete: "CASCADE",
  })
  employeeCitizenship: Media;

  // many employees belong to one library
  @ManyToOne(() => Library, (library) => library.employees, {
    onDelete: "CASCADE",
  })
  library: Library;

  // authentication details
  @OneToOne(() => Auth, (auth) => auth.libraryEmp)
  auth: Auth;
}
