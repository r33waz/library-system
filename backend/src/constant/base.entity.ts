import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class BaseEntity {
  @Column({ primary: true, type: "uuid" })
  id: string = uuidv4();

  @Column({ name: "last_activity_date", type: "date" })
  lastActivityDate: Date = new Date();

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date = new Date();

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date = new Date();

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
  deletedAt?: Date;
}

export default BaseEntity;
