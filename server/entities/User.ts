import {Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Top } from './Top';
import {Story} from './Story'
import {Voting} from "../entities/Voting";
import { VotingOptionReaction } from "../entities/VotingOptionReaction";

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

    @OneToMany(type => VotingOptionReaction, votingOptionReaction => votingOptionReaction.user)
    votingOptionReactions: VotingOptionReaction[];

	@Column({ default: "" })
	avatar: string;

    @OneToMany(type => Top, top => top.user)
    tops: Top[];

    @OneToMany(type => Story, story=> story.user)
    stories: Story[];
}