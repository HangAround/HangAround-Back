import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Room } from "./Room";

@Entity("Game", { schema: "hangaround-1" })
export class Game {
  @PrimaryGeneratedColumn('increment',{ type: "int", name: "game_id" })
  gameId: number;

  @Column("varchar", { name: "game_name", length: 45 })
  gameName: string;

  @OneToMany(() => Room, (room) => room.game)
  rooms: Room[];
}
