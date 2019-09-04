import { User } from "./UserModel";

export class MovieList {
  id: string;
  created_at: Date;
  title: string;
  description: string;
  image_url: string;
  isPrivate: boolean;
  moviesId: string[];
  user: User;
}
