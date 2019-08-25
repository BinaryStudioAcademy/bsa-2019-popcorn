import { Voting } from "./VotingModel";
import { VotingOptionReaction } from "./VotingOptionReaction";
import { Top } from "./TopModel";
import { Story } from "./StoryModel";
import { Surveys } from "./SurveysModel";
import { SurveysQuestionAnswer } from "./SurveysQuestionAnswer";

export class User {
  id?: string;
  name: string;
  email: string;
  role?: string;
  password?: string;
  location?: string;
  aboutMe?: string;
  male?: boolean;
  female?: boolean;
  votings?: Voting[];
  votingOptionReactions?: VotingOptionReaction[];
  avatar?: string;
  tops?: Top[];
  stories?: Story[];
  reset_token: string;
  surveys?: Surveys[];
  surveysQuestionAnswer?: SurveysQuestionAnswer[];
}
