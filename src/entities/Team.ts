import { Column, Entity, OneToMany } from "typeorm";
import { Cis } from "./Cis";
import { TeamInfo } from "./TeamInfo";

@Entity("Team", { schema: "hangaround-1" })
export class Team {
  @Column("int", { primary: true, name: "team_id" })
  teamId: number;

  @Column("int", { name: "room_id" })
  roomId: number;

  @OneToMany(() => Cis, (cis) => cis.team)
  cis: Cis[];

  @OneToMany(() => TeamInfo, (teamInfo) => teamInfo.team)
  teamInfos: TeamInfo[];
}
