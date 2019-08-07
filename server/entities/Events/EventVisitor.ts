import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "entities/Events/node_modules/typeorm";
import { User } from "../User";
import { Event } from "./Event";

@Entity()
export class EventVisitor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @OneToOne(type => Event)
    @JoinColumn()
    event: string;

    @Column()
    status: string;  
   
}