import {Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { CisData } from "./CisData";
import { Team } from "./Team";
import {Room} from "./Room";

@Index("fk_Cis_Cis_data1", ["cisAnswerId"], {})
@Index("fk_Cis_Team1", ["teamId"], {})
@Entity("Cis", { schema: "hangaround-1" })
export class Cis {
  @PrimaryGeneratedColumn('increment',{ type: "int", name: "cis_id" })
  cisId: number;

  @Column("int", { name: "team_id" })
  teamId: number;

  @Column("bigint", { name: "room_id" })
  roomId: bigint;

  @Column("int", { name: "cis_answer_id" })
  cisAnswerId: number;

  @Column("tinyint", { name: "correct", nullable: true })
  correct: number | null;

  @ManyToOne(() => CisData, (cisData) => cisData.cis, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "cis_answer_id", referencedColumnName: "cisDataId" }])
  cisAnswer: CisData;

  @ManyToOne(() => Team, (team) => team.cis, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "team_id", referencedColumnName: "teamId" }])
  team: Team;

  @ManyToOne(() => Room, (room) => room.cis, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "room_id", referencedColumnName: "roomId" }])
  room: Room;
}
