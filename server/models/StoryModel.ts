import { User } from "./UserModel";

export class Story {
  id: string;
  image_url: string;
  caption: string;
  user: User;
  type: string;
  activityId: string;
  movieId: string;
  movieOption: string;
  backgroundColor: string;
  fontColor: string;
  textPositionX: number;
  textPositionY: number;
  created_at: Date;
}
