import { getCustomRepository } from "typeorm";
import { SurveysQuestion } from "../models/SurveysQuestionModel";
import SurveysQuestionRepository from "../repository/surveysQuestion.repository";

export const getSurveysQuestionBySurveysId = async (
  id: string,
  next
): Promise<SurveysQuestion[]> => {
  return await getCustomRepository(
    SurveysQuestionRepository
  ).getSurveysQuestionBySurveysId(id, next);
};

export const getSurveysQuestionById = async (
  id: string,
  next
): Promise<SurveysQuestion[]> => {
  return await getCustomRepository(
    SurveysQuestionRepository
  ).getSurveysQuestionById(id, next);
};

export const updateSurveysQuestionById = async (
  id: string,
  surveysQuestion: SurveysQuestion,
  next
): Promise<SurveysQuestion> => {
  return await getCustomRepository(
    SurveysQuestionRepository
  ).updateSurveysQuestionById(id, surveysQuestion, next);
};

export const deleteSurveysQuestionById = async (
  id: string,
  next
): Promise<{}> => {
  return await getCustomRepository(
    SurveysQuestionRepository
  ).deleteSurveysQuestionById(id, next);
};
