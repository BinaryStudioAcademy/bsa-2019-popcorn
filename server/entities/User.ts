import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Top } from "./Top";
import { Story } from "./Story";
import { Surveys } from "./Surveys";
import { SurveysQuestionAnswer } from "./SurveysQuestionAnswer";
import { Voting } from "../entities/Voting";
import { VotingOptionReaction } from "../entities/VotingOptionReaction";
import { Follower } from "./Follower";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: "user" })
  role: string;

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

  @Column({ default: true })
  emailNotificationNews: boolean;

  @Column({ default: true })
  emailNotificationUpdatesFromFollowed: boolean;

  @Column({ default: true })
  emailNotificationComments: boolean;

  @Column({ default: true })
  emailNotificationEvents: boolean;

  @Column({ default: true })
  siteNotificationUpdatesFromFollowed: boolean;

  @Column({ default: true })
  siteNotificationComments: boolean;

  @Column({ default: true })
  siteNotificationEvents: boolean;

  @Column({ default: "All" })
  privacyProfileInfo: string;

  @Column({ default: "All" })
  privacyMyPosts: string;

  @Column({ default: "All" })
  privacyStories: string;

  @Column({ default: "All" })
  privacyEvents: string;

  @Column({ default: "All" })
  privacySurveys: string;

  @Column({ default: "All" })
  privacyTops: string;

  @Column({ default: "All" })
  privacyCollections: string;

  @Column({ default: "All" })
  privacyWatchlist: string;

  @Column({ default: "All" })
  privacyReviews: string;

  @Column({ default: "All" })
  privacyMessages: string;

  @OneToMany(type => Voting, voting => voting.user, { onDelete: "CASCADE" })
  votings: Voting[];

  @OneToMany(
    type => VotingOptionReaction,
    votingOptionReaction => votingOptionReaction.user,
    { onDelete: "CASCADE" }
  )
  votingOptionReactions: VotingOptionReaction[];

  @Column({ default: "" })
  avatar: string;

  @OneToMany(type => Top, top => top.user, { onDelete: "CASCADE" })
  tops: Top[];

  @OneToMany(type => Story, story => story.user, { onDelete: "CASCADE" })
  stories: Story[];

  @OneToMany(type => Surveys, surveys => surveys.user, { onDelete: "CASCADE" })
  surveys: Surveys[];

  @OneToMany(
    type => SurveysQuestionAnswer,
    surveysQuestionAnswer => surveysQuestionAnswer.user,
    { onDelete: "CASCADE" }
  )
  surveysQuestionAnswer: SurveysQuestionAnswer[];

  @Column({ default: "", nullable: true })
  reset_token: string;

  @OneToMany(type => Follower, follower => follower.user, {
    onDelete: "CASCADE"
  })
  followers: Follower[];
}
