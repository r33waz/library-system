import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import User from "./user.entity";

@Entity("role_request")
export class Rolerequest extends BaseEntity {
  @Column({ name: "requested_role" })
  requestedRole: string;

  @Column()
  status: string;

  @Column()
  reason: string;

  // a single `User` because one role request belongs to one user
  @ManyToOne(() => User, (user) => user.roleRequest, { onDelete: "CASCADE" })
  user: User;
}

export default Rolerequest;
