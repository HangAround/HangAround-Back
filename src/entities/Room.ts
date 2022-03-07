import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Liar } from "./Liar";
import { Game } from "./Game";
import { User } from "./User";

@Index("fk_Room_Game1", ["gameId"], {})
@Entity("Room", { schema: "hangaround-1" })
export class Room {
  @Column("int", { primary: true, name: "room_id" })
  roomId: number;

  @Column("varchar", { name: "room_name", length: 45 })
  roomName: string;

  @Column("int", { name: "max_player" })
  maxPlayer: number;

  @Column("varchar", { name: "link", length: 45 })
  link: string;

  @Column("int", { name: "owner_id" })
  ownerId: number;

  @Column("int", { name: "player_cnt", nullable: true })
  playerCnt: number | null;

  @Column("varchar", { name: "game_status", nullable: true, length: 45 })
  gameStatus: string | null;

  @Column("int", { name: "game_id" })
  gameId: number;

  @OneToMany(() => Liar, (liar) => liar.room)
  liars: Liar[];

  @ManyToOne(() => Game, (game) => game.rooms, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "game_id", referencedColumnName: "gameId" }])
  game: Game;

  @OneToMany(() => User, (user) => user)
  users: User[];
}
