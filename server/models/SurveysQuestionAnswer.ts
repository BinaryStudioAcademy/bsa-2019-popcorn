import { User } from "./UserModel";
import { SurveysQuestion } from "./SurveysQuestionModel";
import { SurveysQuestionOption } from "./SurveysQuestionOption";

export class SurveysQuestionAnswer {
  id: string;
  value: string;
  surveysQuestion: SurveysQuestion;
  surveysQuestionOption: SurveysQuestionOption;
  user: User;
}
