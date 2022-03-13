import "reflect-metadata";
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp} from "typeorm";
import {Room} from "./Room";

@Entity("User", {schema: "hangaround-1"})
export class User {
    @PrimaryGeneratedColumn('increment', {type: "bigint", name: "user_id"})
    userId: bigint;

    @Column("bigint", {name: "sns_id"})
    snsId: bigint;

    @Column("varchar", {name: "user_name", length: 15})
    userName: string;

    @Column("varchar", {name: "channel", length: 15})
    channel: string;

    @ManyToOne(() => Room, (room) => room.users, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{name: "room_id", referencedColumnName: "roomId"}])
    room: Room;

    @CreateDateColumn({name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAt: Date;

}
