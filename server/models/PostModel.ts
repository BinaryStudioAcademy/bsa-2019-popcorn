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
  top?: Top;
  event?: Event;
  user: User;
  userId: string;
  createdAt: Date;
}
