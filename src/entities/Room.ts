import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany, PrimaryGeneratedColumn,
} from "typeorm";
import { Liar } from "./Liar";
import { Game } from "./Game";
import { User } from "./User";
import {Cis} from "./Cis";

@Index("fk_Room_Game1", ["gameId"], {})
@Entity("Room", { schema: "hangaround-1" })
export class Room {
  @PrimaryGeneratedColumn('increment',{ type: "bigint", name: "room_id" })
  roomId: bigint;

  @Column("varchar", { name: "room_name", length: 45 })
  roomName: string;

  @Column("int", { name: "max_player" })
  maxPlayer: number;

  @Column("varchar", { name: "room_code", length: 45 })
  roomCode: string;

  @Column("bigint", { name: "owner_id" })
  ownerId: bigint;

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

  @OneToMany(() => Cis, (cis) => cis.roomId)
  cis: Cis[];
}
