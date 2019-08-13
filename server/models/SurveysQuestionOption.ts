import { SurveysQuestion } from "./SurveysQuestionModel";
import { SurveysQuestionAnswer } from "./SurveysQuestionAnswer";

export class SurveysQuestionOption {
  id: string;
  title: string;
  surveysQuestion: SurveysQuestion;
  surveysOptionAnswer: SurveysQuestionAnswer[];
}