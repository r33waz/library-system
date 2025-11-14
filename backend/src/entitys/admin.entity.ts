import { Column, Entity, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { BLOCK_STATUS, ROLES, SIGNUPSTATUS } from "../constant/enum";
import { Auth } from "./auth.enity";
import Media from "./media.entity";

@Entity("admin")
export class Admin extends BaseEntity {
  @Column({ name: "first_name" })
  firstname: string;

  @Column({ name: "middle_name", nullable: true })
  middlename: string;

  @Column({ name: "last_name" })
  lastname: string;

  @Column({ name: "phone_number" })
  phoneNumber: string;

  @OneToOne(() => Media, (media) => media.adminProfile, {
    nullable: true,
    onDelete: "CASCADE",
  })
  profilepic: Media;

  @Column({
    name: "status",
    type: "enum",
    enum: SIGNUPSTATUS,
    default: SIGNUPSTATUS.PENDING,
  })
  status: SIGNUPSTATUS;

  @Column({ name: "role", type: "enum", enum: ROLES, default: ROLES.USER })
  role: ROLES;

  @Column({
    name: "blocked",
    type: "enum",
    enum: BLOCK_STATUS,
    default: BLOCK_STATUS.ACTIVE,
  })
  blocked: BLOCK_STATUS;

  @OneToOne(() => Auth, (auth) => auth.admin)
  auth: Auth;
}

export default Admin;
