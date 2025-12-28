import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { BLOCK_STATUS } from "../constant/enum";
import Admin from "./admin.entity";
import Library from "./library.entity";
import { LibraryEmp } from "./libraryEmp.entity";
import User from "./user.entity";

@Entity("auth")
@Index("IDX_AUTH_EMAIL", ["email"])
export class Auth extends BaseEntity {
  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ name: "password", select: false, nullable: true })
  @IsOptional()
  password: string;

  @Column({ name: "firebaseId", nullable: true })
  @IsOptional()
  firebaseId: string;

  @OneToOne(() => User, (user) => user?.auth, { nullable: true, cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToOne(() => Admin, (admin) => admin?.auth, {
    nullable: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "adminId" })
  admin: Admin;

  @Column({
    name: "blocked",
    type: "enum",
    enum: BLOCK_STATUS,
    default: BLOCK_STATUS.ACTIVE,
  })
  blocked: BLOCK_STATUS;

  @Column({ default: false })
  isEmailVerified: boolean;

  @OneToOne(() => Library, { nullable: true, cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "libraryId" })
  library: Library;

  @OneToOne(() => LibraryEmp, (libraryEmp) => libraryEmp.auth, { nullable: true, cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "libraryEmpId" })
  libraryEmp: LibraryEmp;
}
