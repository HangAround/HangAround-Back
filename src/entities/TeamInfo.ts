import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Team } from "./Team";
import { User } from "./User";

@Index("fk_Team_info_Team1", ["teamId"], {})
@Entity("Team_info", { schema: "hangaround-1" })
export class TeamInfo {
  @Column("bigint", { primary: true, name: "user_id" })
  userId: bigint;

  @Column("bigint", { primary: true, name: "team_id" })
  teamId: bigint;

  @Column("varchar", { name: "role", length: 45 })
  role: string;

  @ManyToOne(() => Team, (team) => team.teamInfos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "team_id", referencedColumnName: "teamId" }])
  team: Team;

  @OneToOne(() => User, (user) => user, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
