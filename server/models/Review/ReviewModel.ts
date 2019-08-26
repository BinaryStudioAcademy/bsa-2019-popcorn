import { User } from "../UserModel";

export class Review {
  id: string;
  text: string;
  movieId: string;
  analysis: string;
  created_at: Date;
  user: User;
}
