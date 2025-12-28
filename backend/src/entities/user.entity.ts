import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { ROLES } from "../constant/enum";
import { Auth } from "./auth.enity";
import { Bill } from "./bill.entity";
import { BorrowRequest } from "./borrow_request.entity";
import Media from "./media.entity";
import WishList from "./wishList.entity";

@Entity("user")
@Index("IDX_USER_UNIVERSITY_ID", ["universityId"])
export class User extends BaseEntity {
  @Column({ name: "first_name" })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  firstname: string;

  @Column({ name: "middle_name", nullable: true })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  middlename: string;

  @Column({ name: "last_name" })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  lastname: string;

  @Column({ name: "phone_number", default: null })
  @IsOptional()
  @IsString()
  @Length(10, 15)
  phoneNumber: string;

  @Column({ name: "university_id", unique: true, default: null })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  universityId: string;

  @OneToOne(() => Media, (media) => media.universityCard, {
    onDelete: "CASCADE",
  })
  universityCard: Media;

  @OneToOne(() => Media, (media) => media.profilepic, { onDelete: "CASCADE" })
  profilepic: Media;


  @Column({ name: "role", type: "enum", enum: ROLES, default: ROLES.USER })
  role: ROLES;

  @OneToOne(() => Auth, (auth) => auth.user, { onDelete: "CASCADE" })
  auth: Auth;

  @OneToMany(() => WishList, (wishlist) => wishlist.user, { cascade: true, onDelete: "CASCADE" })
  wishlist: WishList[];

  @OneToMany(() => BorrowRequest, (borrowRequest) => borrowRequest.user, { cascade: true, onDelete: "CASCADE" })
  borrowRequest: BorrowRequest[];

  @OneToMany(() => Bill, (bill) => bill.user, { cascade: true, onDelete: "CASCADE" })
  bill: Bill[];
}

export default User;
