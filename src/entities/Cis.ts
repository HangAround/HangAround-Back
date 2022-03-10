import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { CisData } from "./CisData";
import { Team } from "./Team";

@Index("fk_Cis_Cis_data1", ["cisAnswerId"], {})
@Index("fk_Cis_Team1", ["teamId"], {})
@Entity("Cis", { schema: "hangaround-1" })
export class Cis {
  @Column("int", { primary: true, name: "cis_id" })
  cisId: number;

  @Column("int", { name: "team_id" })
  teamId: number;

  @Column("int", { name: "cis_idx" })
  cisIdx: number;

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
}
