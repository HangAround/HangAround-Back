import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Cis } from "./Cis";

@Entity("Cis_data", { schema: "hangaround-1" })
export class CisData {
  @PrimaryGeneratedColumn('increment',{ type: "int", name: "cis_data_id" })
  cisDataId: number;

  @Column("varchar", { name: "cis_category", length: 45 })
  cisCategory: string;

  @Column("varchar", { name: "cis_keyword", length: 45 })
  cisKeyword: string;

  @OneToMany(() => Cis, (cis) => cis.cisAnswer)
  cis: Cis[];
}
