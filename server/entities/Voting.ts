import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {User} from "./User";
import { VotingOption } from "./VotingOption";

@Entity()
export class Voting {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    body: string;

    @ManyToOne(type => User)
    user: User;

    @OneToMany(type => VotingOption, votingOption => votingOption.voting)
    votingOptions: VotingOption[];
}
