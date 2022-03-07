import { Column, Entity, OneToMany } from "typeorm";
import { Room } from "./Room";

@Entity("Game", { schema: "hangaround-1" })
export class Game {
  @Column("int", { primary: true, name: "game_id" })
  gameId: number;

  @Column("varchar", { name: "game_name", length: 45 })
  gameName: string;

  @OneToMany(() => Room, (room) => room.game)
  rooms: Room[];
}
