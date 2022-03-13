import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Cis } from "./Cis";
import { TeamInfo } from "./TeamInfo";

@Entity("Team", { schema: "hangaround-1" })
export class Team {
  @PrimaryGeneratedColumn('increment',{ type: "bigint", name: "team_id" })
  teamId: bigint;

  @Column("bigint", { name: "room_id" })
  roomId: bigint;

  @OneToMany(() => Cis, (cis) => cis.team)
  cis: Cis[];

  @OneToMany(() => TeamInfo, (teamInfo) => teamInfo.team)
  teamInfos: TeamInfo[];
}
