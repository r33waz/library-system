import { Column, CreateDateColumn, Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class BaseEntity {
  @Column({ primary: true, type: "uuid" })
  id: string = uuidv4();

  @Column({ name: "last_activity_date", type: "date" })
  lastActivityDate: Date = new Date();

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date = new Date();
}

export default BaseEntity;
