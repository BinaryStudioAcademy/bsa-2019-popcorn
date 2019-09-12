import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { VotingOption } from "./VotingOption";
import { User } from "./User";
import { Voting } from "./Voting";

@Entity()
export class VotingOptionReaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => VotingOption, { onDelete: "CASCADE" })
  votingOption: VotingOption;

  @ManyToOne(type => Voting, { onDelete: "CASCADE" })
  voting: Voting;

  @ManyToOne(type => User, { onDelete: "CASCADE" })
  user: User;
}
