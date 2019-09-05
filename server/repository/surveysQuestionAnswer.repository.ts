import { EntityRepository, Repository } from "typeorm";
import { getCustomRepository } from "typeorm";
import UserRepository from "./user.repository";
import SurveyQuestionOption from "./surveysQuestionOption.repository";
import SurveyQuestion from "./surveysQuestion.repository";
import { SurveysQuestionAnswer } from "../models/SurveysQuestionAnswer";
import { SurveysQuestionAnswer as SurveysQuestionAnswerEntity } from "../entities/SurveysQuestionAnswer";

@EntityRepository(SurveysQuestionAnswerEntity)
class SurveysQuestionAnswerRepository extends Repository<
  SurveysQuestionAnswer
> {
  async setQuestionAnswer(userId, questionId, optionId, value, next?) {
    try {
      const user = await getCustomRepository(UserRepository).findOne({
        id: userId
      });
      const surveysQuestionOption = optionId
        ? await getCustomRepository(SurveyQuestionOption).findOne({
            id: optionId
          })
        : null;
      const surveysQuestion = await getCustomRepository(SurveyQuestion).findOne(
        { id: questionId }
      );
      const prevAnswer = await this.findOne({
        user,
        surveysQuestionOption,
        surveysQuestion
      });
      return prevAnswer
        ? await this.update(prevAnswer.id, { value })
        : await this.save({
            value,
            surveysQuestion,
            surveysQuestionOption,
            user
          });
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }
}

export default SurveysQuestionAnswerRepository;
