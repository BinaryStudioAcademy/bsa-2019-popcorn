import { getCustomRepository } from "typeorm";
import { SurveysQuestionOption } from "../models/SurveysQuestionOption";
import SurveysQuestionOptionRepository from "../repository/surveysQuestionOption.repository";

export const getQuestionOptionByQuestionId = async (
  id: string,
  next
): Promise<SurveysQuestionOption[]> => {
  return await getCustomRepository(
    SurveysQuestionOptionRepository
  ).getQuestionOptionByQuestionId(id, next);
};

export const updateQuestionOptionById = async (
  id: string,
  surveysQuestionOption: SurveysQuestionOption,
  next
): Promise<SurveysQuestionOption> => {
  return await getCustomRepository(
    SurveysQuestionOptionRepository
  ).updateQuestionOptionById(id, surveysQuestionOption, next);
};

export const deleteQuestionOptionById = async (
  id: string,
  next
): Promise<{}> => {
  return await getCustomRepository(
    SurveysQuestionOptionRepository
  ).deleteQuestionOptionById(id, next);
};
