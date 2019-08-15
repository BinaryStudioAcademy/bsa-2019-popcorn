import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Top } from "./Top";
import { Story } from "./Story";
import { Surveys } from "./Surveys";
import { SurveysQuestionAnswer } from "./SurveysQuestionAnswer";
import { Voting } from "../entities/Voting";
import { VotingOptionReaction } from "../entities/VotingOptionReaction";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  aboutMe: string;

  @Column({ nullable: true })
  male: boolean;

  @Column({ nullable: true })
  female: boolean;

  @OneToMany(type => Voting, voting => voting.user)
  votings: Voting[];

  @OneToMany(
    type => VotingOptionReaction,
    votingOptionReaction => votingOptionReaction.user
  )
  votingOptionReactions: VotingOptionReaction[];

  @Column({ default: "" })
  avatar: string;

  @OneToMany(type => Top, top => top.user)
  tops: Top[];

  @OneToMany(type => Story, story => story.user)
  stories: Story[];

  @OneToMany(type => Surveys, surveys => surveys.user)
  surveys: Surveys[];

  @OneToMany(
    type => SurveysQuestionAnswer,
    surveysQuestionAnswer => surveysQuestionAnswer.user
  )
  surveysQuestionAnswer: SurveysQuestionAnswer[];

  @Column({ default: "", nullable: true })
  reset_token: string;
}
