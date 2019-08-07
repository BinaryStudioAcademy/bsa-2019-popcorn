import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Voting} from "../entities/Voting"

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    location:string;

    @Column()
    aboutMe: string;

    @OneToMany(type => Voting, voting => voting.user)
    votings: Voting[];
}