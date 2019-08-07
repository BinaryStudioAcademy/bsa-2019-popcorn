import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Timestamp } from "typeorm";

import { User } from "../User";
import { Movie } from "../Movie";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    time: Timestamp;

    @Column()
    location: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @OneToOne(type => Movie)
    @JoinColumn()
    movie: Movie;
}