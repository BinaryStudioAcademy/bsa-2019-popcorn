import { User } from "./UserModel";

export class Surveys {
  id: string;
  created_at: Date;
  movieId: string;
  status: Status;
  user: User;
}

enum Status {
  ToWatch = "to_watch",
  Watched = "watched"
}
