import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
} from "typeorm";
import BaseEntity from "../constant/base.entity";
import { BLOCK_STATUS } from "../constant/enum";
import Admin from "./admin.entity";
import Library from "./library.entity";
import { LibraryEmp } from "./libraryEmp.entity";
import User from "./user.entity";

@Entity("auth")
@Index("IDX_AUTH_DELETED_AT", ["deletedAt"])
@Index("IDX_AUTH_BLOCKED", ["blocked"])
export class Auth extends BaseEntity {

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ name: "password", select: false, nullable: true })
  @IsOptional()
  password?: string;

  @Column({ nullable: true, unique: true })
  @IsOptional()
  firebaseId?: string;

  @Index("IDX_AUTH_USER_ID")
  @OneToOne(() => User, (user) => user.auth, {
    nullable: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user?: User;

  @Index("IDX_AUTH_ADMIN_ID")
  @OneToOne(() => Admin, (admin) => admin.auth, {
    nullable: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "adminId" })
  admin?: Admin;

  @Column({
    type: "enum",
    enum: BLOCK_STATUS,
    default: BLOCK_STATUS.ACTIVE,
  })
  blocked: BLOCK_STATUS;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Index("IDX_AUTH_LIBRARY_ID")
  @OneToOne(() => Library, {
    nullable: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "libraryId" })
  library?: Library;

  @Index("IDX_AUTH_LIBRARY_EMP_ID")
  @OneToOne(() => LibraryEmp, (libraryEmp) => libraryEmp.auth, {
    nullable: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "libraryEmpId" })
  libraryEmp?: LibraryEmp;
}

export default Auth;
