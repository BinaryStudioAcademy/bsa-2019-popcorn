import { getCustomRepository } from "typeorm";
import { SurveysQuestionAnswer } from "../models/SurveysQuestionAnswer";
import SurveysQuestionAnswerRepository from "../repository/surveysQuestionAnswer.repository";

export const setQuestionAnswer = async (
  data,
  next
): Promise<SurveysQuestionAnswer> => {
  return await getCustomRepository(
    SurveysQuestionAnswerRepository
  ).setQuestionAnswer(
    data.userId,
    data.questionId,
    data.optionId,
    data.value,
    next
  );
};
