import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {VotingOption} from "./VotingOption";
import {User} from "./User";

@Entity()
export class VotingOptionReaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: false })
    isChosen: boolean;

    @ManyToOne(type => VotingOption)
    votingOption: VotingOption;

    @ManyToOne(type => User)
    user: User;
}
