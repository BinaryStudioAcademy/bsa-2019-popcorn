import { getCustomRepository } from "typeorm";
import { Surveys } from "../models/SurveysModel";
import { SurveysQuestion } from "../models/SurveysQuestionModel";
import SurveysRepository from "../repository/surveys.repository";

interface IRequest {
  id: string;
  surveys: Surveys;
  surveysQuestion: SurveysQuestion[];
}

export const createSurveys = async (body: IRequest, next): Promise<Surveys> => {
  return await getCustomRepository(SurveysRepository).createSurveys(
    body.id,
    body.surveys,
    body.surveysQuestion,
    next
  );
};

export const getSurveys = async (next): Promise<Surveys[]> => {
  return await getCustomRepository(SurveysRepository).getSurveys(next);
};

export const getSurveysById = async (id: string, next): Promise<Surveys> => {
  return await getCustomRepository(SurveysRepository).getSurveysById(id, next);
};

export const deleteSurveysById = async (id: string, next): Promise<{}> => {
  return await getCustomRepository(SurveysRepository).deleteSurveysById(
    id,
    next
  );
};

export const updateSurveysById = async (
  id: string,
  body,
  next
): Promise<Surveys> => {
  return await getCustomRepository(SurveysRepository).updateSurveysById(
    id,
    body,
    next
  );
};

export const getSurveysByUserId = async (
  id: string,
  next
): Promise<Surveys[]> => {
  return await getCustomRepository(SurveysRepository).getSurveysByUserId(
    id,
    next
  );
};

// export const createSurveysQuestionBySurveysId = async (id: string, surveysOption: SurveysQuestion, next): Promise<SurveysQuestion> => {
//   return await getCustomRepository(SurveysRepository).createSurveysQuestionBySurveysId(id, surveysOption, next);
// }
