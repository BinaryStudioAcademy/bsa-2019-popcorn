import { User } from "./UserModel";

export class Review {
  id: string;
  text: string;
  movieId: string;
  user: User;
}
