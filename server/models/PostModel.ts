import { User } from "./UserModel";
import { Surveys } from "./SurveysModel";
import { Top } from "./TopModel";
import { Event } from "./Events";

import { PostCommentsModel as PostComment } from "./PostCommentsModel.js";
export class Post {
  id: string;
  title: string;
  description: string;
  image_url: string;
  extraTitle?: string;
  extraLink?: string;
  survey?: Surveys;
  surveyId?: string;
  top?: Top;
  topId?: string;
  event?: Event;
  eventId?: string;
  user: User;
  userId: string;
  comments: PostComment[];
}
