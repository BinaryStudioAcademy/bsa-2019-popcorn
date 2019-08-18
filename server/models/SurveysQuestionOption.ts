import { SurveysQuestion } from "./SurveysQuestionModel";
import { SurveysQuestionAnswer } from "./SurveysQuestionAnswer";

export class SurveysQuestionOption {
  id: string;
  index: number;
  title: string;
  surveysQuestion: SurveysQuestion;
  surveysOptionAnswer: SurveysQuestionAnswer[];
}
