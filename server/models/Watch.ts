import { User } from "./UserModel";
import { SurveysQuestion } from "./SurveysQuestionModel";

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
