import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { Auth } from "./auth.enity";

@Entity("auth_otps")
export class AuthOtp extends BaseEntity {
  @Column()
  otp: string;

  @Column({ type: "timestamptz" })
  expireAt: Date;

  @ManyToOne(() => Auth, { onDelete: "CASCADE" })
  auth: Auth;
}


