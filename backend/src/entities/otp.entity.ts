import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { OTP_TYPE } from "../constant/enum";
import { Auth } from "./auth.enity";

@Entity("auth_otps")
export class AuthOtp extends BaseEntity {
  @Column()
  otp: string;

  @Column({ type: "timestamptz" })
  expireAt: Date;

  @Column({ type: "enum", enum: OTP_TYPE, nullable: true })
  otp_type: OTP_TYPE;

  @ManyToOne(() => Auth, { onDelete: "CASCADE" })
  auth: Auth;
}
