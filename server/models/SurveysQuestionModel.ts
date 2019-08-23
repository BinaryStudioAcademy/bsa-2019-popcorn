import { Surveys } from "./SurveysModel";
import { SurveysQuestionOption } from "./SurveysQuestionOption";
import { SurveysQuestionAnswer } from "./SurveysQuestionAnswer";

export class SurveysQuestion {
  id: string;
  index: number;
  title: string;
  firstLabel: string;
  lastLabel: string;
  type: string;
  image: string;
  required: boolean;
  surveys: Surveys;
  surveysQuestionOption: SurveysQuestionOption[];
  surveysQuestionAnswer: SurveysQuestionAnswer[];
}
