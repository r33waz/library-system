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

  @OneToOne(() => Book, (book) => book.coverImage, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "bookCoverImageId" })
  bookCoverImage: Book;

  @OneToOne(() => User, (user) => user.profilepic, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "profileId" })
  profilepic: User;

  @OneToOne(() => User, (user) => user.universityCard, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "universityCardId" })
  universityCard: User;

  @OneToOne(() => Admin, (admin) => admin.profilepic, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "adminProfileId" })
  adminProfile: Admin;

  @OneToOne(() => Library, (library) => library.profilepic, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "libraryProfileId" })
  libraryProfile: Library;

  @OneToOne(() => LibraryEmp, (library) => library.employeePic, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "employeePicId" })
  employeePic: LibraryEmp;

  @OneToOne(() => Genre, (genre) => genre.genrePic, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "genreId" })
  genrePic: Genre;

  @OneToOne(() => Category, (genre) => genre.categoryPic, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
    nullable: true,
  })
  @JoinColumn({ name: "categoryId" })
  categoryPic: Genre;
}

export default Media;
