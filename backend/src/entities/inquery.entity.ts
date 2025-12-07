import { Column, Entity } from "typeorm";
import BaseEntity from "../constant/base.entity";

Entity("inquery");

class Inquery extends BaseEntity {
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  number: string;
  @Column()
  message: string;
}

export default Inquery;
