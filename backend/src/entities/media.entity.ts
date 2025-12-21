import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { MEDIA_TYPE } from "../constant/enum";
import Admin from "./admin.entity";
import Book from "./book.entity";
import Category from "./category.entity";
import Genre from "./genre.entity";
import Library from "./library.entity";
import { LibraryEmp } from "./libraryEmp.entity";
import User from "./user.entity";

@Entity("media")
export class Media extends BaseEntity {
  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({ type: "enum", enum: MEDIA_TYPE, default: null })
  mediaType: string;

  // book cover image
  @OneToOne(() => Book, (book) => book.coverImage, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "bookCoverImageId" })
  bookCoverImage: Book;

  // user profile pic
  @OneToOne(() => User, (user) => user.profilepic, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "profileId" })
  profilepic: User;

  // user university card
  @OneToOne(() => User, (user) => user.universityCard, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "universityCardId" })
  universityCard: User;

  // library admin profile pics
  @OneToOne(() => Admin, (admin) => admin.profilepic, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "adminProfileId" })
  adminProfile: Admin;

  // library profile pic
  @OneToOne(() => Library, (library) => library.profilepic, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "libraryProfileId" })
  libraryProfile: Library;

  // library user profile pics
  @OneToOne(() => LibraryEmp, (library) => library.employeePic, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "employeePicId" })
  employeePic: LibraryEmp;

  // library user pan
  @OneToOne(() => LibraryEmp, (library) => library.employeePan, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "employeePanId" })
  employeePan: LibraryEmp;

  // library user citizenship
  @OneToOne(() => LibraryEmp, (library) => library.employeeCitizenship, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "employeeCitizenshipId" })
  employeeCitizenship: LibraryEmp;

  // genre pic
  @OneToOne(() => Genre, (genre) => genre.genrePic, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "genreId" })
  genrePic: Genre;

  // category pic
  @OneToOne(() => Category, (genre) => genre.categoryPic, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "categoryId" })
  categoryPic: Genre;
}

export default Media;
