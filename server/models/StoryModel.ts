import { User } from "./UserModel";

export class Story {
  id: string;
  image_url: string;
  caption: string;
  user: User;
  type: string;
  activityId: string;
}
