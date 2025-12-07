import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { BLOCK_STATUS, ROLES, SIGNUPSTATUS } from "../constant/enum";
import { Auth } from "./auth.enity";
import { Bill } from "./bill.entity";
import { BorrowRequest } from "./borrow_request.entity";
import Media from "./media.entity";
import Rolerequest from "./roleRequest.entity";
import WishList from "./wishList.entity";

@Entity("user")
export class User extends BaseEntity {
  @Column({ name: "first_name" })
  firstname: string;

  @Column({ name: "middle_name", nullable: true })
  middlename: string;

  @Column({ name: "last_name" })
  lastname: string;

  @Column({ name: "phone_number", default: null })
  phoneNumber: string;

  @Column({ name: "university_id", unique: true, default: null })
  universityId: string;

  @OneToOne(() => Media, (media) => media.universityCard, {
    onDelete: "CASCADE",
  })
  universityCard: Media;

  @OneToOne(() => Media, (media) => media.profilepic, { onDelete: "CASCADE" })
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

  // as one user have multiple role requests
  @OneToMany(() => Rolerequest, (rolerequest) => rolerequest?.user)
  roleRequest: Rolerequest[];

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;

  @OneToMany(() => WishList, (wishlist) => wishlist.user)
  wishlist: WishList[];

  @OneToMany(() => BorrowRequest, (borrowRequest) => borrowRequest.user)
  borrowRequest: BorrowRequest[];

  @OneToMany(() => Bill, (bill) => bill.user)
  bill: Bill[];
}

export default User;
