import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Liar } from "./Liar";

@Entity("Liar_data", { schema: "hangaround-1" })
export class LiarData {
  @PrimaryGeneratedColumn('increment',{ type: "int", name: "liar_data_id" })
  liarDataId: number;

  @Column("varchar", { name: "liar_category", length: 45 })
  liarCategory: string;

  @Column("varchar", { name: "liar_keyword", length: 45 })
  liarKeyword: string;

  @OneToMany(() => Liar, (liar) => liar.liarAnswer)
  liars: Liar[];
}
