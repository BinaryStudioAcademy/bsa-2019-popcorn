import { User } from "./UserModel";
import { SurveysQuestion } from "./SurveysQuestionModel";

export class Surveys {
  id: string;
  title: string;
  description: string;
  type: string;
  user: User;
  surveysQuestion: SurveysQuestion[];
  created_at: Date;
  updated_at: Date;
}