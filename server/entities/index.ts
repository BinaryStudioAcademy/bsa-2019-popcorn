import { User } from "./User";
import { Post } from "./Post";
import { PostReactions } from "./PostReactions";
import { PostComments } from "./PostComments";

import { Movie } from "./Movie";
import { Top } from "./Top";
import { MovieInTop } from './MovieInTop';
import { Story } from "./Story";
import { Event, EventComment, EventVisitor } from "./Events";
import { Voting } from "./Voting";
import { VotingOption } from "./VotingOption";
import { VotingOptionReaction } from "./VotingOptionReaction";
import { Surveys } from "./Surveys";
import { SurveysQuestion } from "./SurveysQuestion";
import { SurveysQuestionAnswer } from "./SurveysQuestionAnswer";
import { SurveysQuestionOption } from "./SurveysQuestionOption";
import { MovieRate } from "./MovieRate/MovieRate";

export default [
  User,
  Post,
  PostReactions,
  PostComments,
  Movie,
  Top,
  MovieInTop,
  Story,
  Event,
  EventComment,
  EventVisitor,
  Voting,
  VotingOption,
  VotingOptionReaction,
  Surveys,
  SurveysQuestion,
  SurveysQuestionAnswer,
  SurveysQuestionOption,
  MovieRate
];
