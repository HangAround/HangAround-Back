import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { LiarData } from "./LiarData";
import { Room } from "./Room";

@Index("fk_Liar_Liar_data1", ["liarAnswerId"], {})
@Index("fk_Liar_Room1", ["roomId"], {})
@Entity("Liar", { schema: "hangaround-1" })
export class Liar {
  @Column("int", { primary: true, name: "liar_id" })
  liarId: number;

  @Column("int", { name: "room_id" })
  roomId: number;

  @Column("int", { name: "liar_answer_id" })
  liarAnswerId: number;

  @ManyToOne(() => LiarData, (liarData) => liarData.liars, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "liar_answer_id", referencedColumnName: "liarDataId" }])
  liarAnswer: LiarData;

  @ManyToOne(() => Room, (room) => room.liars, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "room_id", referencedColumnName: "roomId" }])
  room: Room;
}
