import { User } from "./UserModel";

export class MovieList {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  imageUrl: string;
  isPrivate: boolean;
  moviesId: string[];
  user: User;
}
