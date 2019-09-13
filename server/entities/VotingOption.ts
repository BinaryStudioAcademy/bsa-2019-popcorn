import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Voting } from "./Voting";
import { VotingOptionReaction } from "./VotingOptionReaction";

@Entity()
export class VotingOption {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  body: string;

  @ManyToOne(type => Voting, { onDelete: "CASCADE" })
  voting: Voting;

  @Column()
  votingId: string;

  @OneToMany(
    type => VotingOptionReaction,
    votingOptionReaction => votingOptionReaction.votingOption
  )
  votingOptionReactions: VotingOptionReaction[];
}
