import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Top } from "./Top";
import { Story } from "./Story";
import { Surveys } from "./Surveys";
import { SurveysQuestionAnswer } from "./SurveysQuestionAnswer";
import { Voting } from "./Voting";
import { VotingOptionReaction } from "./VotingOptionReaction";
import { Follower } from "./Follower";
import { FavoriteList } from "./FavoriteList";
import { Settings } from "./Settings";

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
  location: string;

  @Column({ nullable: true })
  aboutMe: string;

  @Column({ nullable: true })
  male: boolean;

  @Column({ nullable: true })
  female: boolean;

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

  @OneToMany(type => Follower, follower => follower.user, {
    onDelete: "CASCADE"
  })
  followers: Follower[];

  @OneToMany(type => FavoriteList, favoriteList => favoriteList.user)
  favoriteLists: FavoriteList[];

  @OneToMany(type => Settings, setting => setting.id)
  settings: Settings;
}
