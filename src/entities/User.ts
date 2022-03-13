import "reflect-metadata";
import {Column, Entity, PrimaryGeneratedColumn, Timestamp} from "typeorm";

@Entity("user", { schema: "hangaround-1" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id" })
  userId: number;

  @Column("int",{name: "sns_id"})
  snsId: number;

  @Column("varchar", { name: "user_name", length: 255 })
  userName: string;

  @Column("varchar", { name: "channel", length: 255 })
  channel: string;

  @Column("int", { name: "room_id" })
  roomId: number;

  @Column("datetime",{name: "created_at"})
  createdAt: Timestamp;
}
