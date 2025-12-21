import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { BLOCK_STATUS } from "../constant/enum";
import Admin from "./admin.entity";
import Library from "./library.entity";
import { LibraryEmp } from "./libraryEmp.entity";
import User from "./user.entity";

@Entity("auth")
export class Auth extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ name: "password", select: false, nullable: true })
  password: string;

  @Column({ name: "firebaseId", nullable: true })
  firebaseId: string;

  @OneToOne(() => User, (user) => user?.auth, { nullable: true, cascade: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToOne(() => Admin, (admin) => admin?.auth, {
    nullable: true,
    cascade: true,
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

  @OneToOne(() => Library, { nullable: true, cascade: true })
  @JoinColumn({ name: "libraryId" })
  library: Library;

  @OneToOne(() => LibraryEmp, (libraryEmp) => libraryEmp.auth)
  @JoinColumn({ name: "libraryEmpId" })
  libraryEmp: LibraryEmp;
}
