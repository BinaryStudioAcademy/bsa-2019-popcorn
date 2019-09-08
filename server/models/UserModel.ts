import { Voting } from "./VotingModel";
import { VotingOptionReaction } from "./VotingOptionReaction";
import { Top } from "./TopModel";
import { Story } from "./StoryModel";
import { Surveys } from "./SurveysModel";
import { SurveysQuestionAnswer } from "./SurveysQuestionAnswer";
import { Follower } from "./FollowerModel";
import { FavoriteList } from "./FavoriteListModel";
import { Settings } from "./SettingsModel";

export class User {
  id: string;
  name: string;
  email: string;
  role: string;
  location: string;
  aboutMe: string;
  male: boolean;
  female: boolean;
  votings: Voting[];
  votingOptionReactions: VotingOptionReaction[];
  avatar: string;
  tops: Top[];
  stories: Story[];
  surveys: Surveys[];
  surveysQuestionAnswer: SurveysQuestionAnswer[];
  followers: Follower[];
  favoriteLists: FavoriteList[];
  settings: Settings;
}
