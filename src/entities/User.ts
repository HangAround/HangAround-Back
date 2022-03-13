import "reflect-metadata";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp} from "typeorm";

@Entity("User", { schema: "hangaround-1" })
export class User {
  @PrimaryGeneratedColumn('increment',{ type: "bigint", name: "user_id" })
  userId: number;

  @Column("bigint",{name: "sns_id"})
  snsId: number;

  @Column("varchar", { name: "user_name", length: 15 })
  userName: string;

  @Column("varchar", { name: "channel", length: 15 })
  channel: string;

  @Column("int", { name: "room_id" })
  roomId: number;

  @CreateDateColumn({ name: 'created_at' ,type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
  createdAt: Date;

}
