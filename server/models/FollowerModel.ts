import { User } from "./UserModel";

export class Follower {
  id: string;
  followed_at: Date;
  user: User;
  follower: User;
}
