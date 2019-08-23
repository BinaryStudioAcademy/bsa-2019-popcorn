import { User } from "./UserModel";
import { MovieInTop } from "./MovieInTopModel";

export class Top {
  id: string;
  title: string;
  description: string;
  topImageUrl: string;
  created_at: Date;
  userId: string;
  user: User;
  genreId: string;
  movieInTop?: MovieInTop[];
}
