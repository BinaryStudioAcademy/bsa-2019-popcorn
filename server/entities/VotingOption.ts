import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Voting} from "./Voting";

@Entity()
export class VotingOption {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    body: string;

    @ManyToOne(type => Voting, { onDelete: 'CASCADE' })
    voting: Voting;
}
