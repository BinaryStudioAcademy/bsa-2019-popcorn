import { User } from "./UserModel";

export class Follower {
  id: string;
  created_at: Date;
  user: User;
  follower: User;
}
