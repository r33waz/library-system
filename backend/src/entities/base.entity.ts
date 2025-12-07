import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { createUUID } from "../utils/uuid.utils";

export class BaseEntity {
  @Column({ primary: true, type: "uuid" })
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @BeforeInsert()
  async UUID() {
    this.id = await createUUID();
  }
}
