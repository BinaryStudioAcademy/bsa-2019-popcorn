import { EntityRepository, Repository } from "typeorm";
import { SurveysQuestion as SurveysQuestionEntity } from "../entities/SurveysQuestion";
import { getCustomRepository } from "typeorm";
import { SurveysQuestion } from "../models/SurveysQuestionModel";
import SurveysRepository from "./surveys.repository";
import SurveysQuestionOptionRepository from "./surveysQuestionOption.repository";
import { Surveys } from "../models/SurveysModel";
import SurveysQuestionAnswerRepository from "./surveysQuestionAnswer.repository";

@EntityRepository(SurveysQuestionEntity)
class SurveysQuestionRepository extends Repository<SurveysQuestion> {
  async createSurveysQuestion(
    surveysQuestion: SurveysQuestion,
    next?,
    surveys?: Surveys
  ) {
    try {
      if (surveys) surveysQuestion.surveys = surveys;

      await Promise.all(
        surveysQuestion.surveysQuestionOption.map(option =>
          getCustomRepository(
            SurveysQuestionOptionRepository
          ).createQuestionOption(option, next)
        )
      );

      return await this.save(surveysQuestion);
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async getSurveysQuestionById(id: string, next?) {
    try {
      const question = await this.findOne(id);
      if (!question)
        return next({ status: 404, message: "Surveys is not found" }, null);
      return await this.findOne(id);
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async getSurveysQuestionBySurveysId(id: string, next?) {
    try {
      const surveys = await getCustomRepository(
        SurveysRepository
      ).getSurveysById(id, next);

      if (!surveys) {
        return next({ status: 404, message: "Surveys is not found" }, null);
      }
      return await this.find({ surveys });
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async updateSurveysQuestionById(id: string, surveysQuestion: SurveysQuestion, surveyId: string, next?) {
    try {
      // await this.update({id}, { 
      //   type: surveysQuestion.type,
      //   title: surveysQuestion.title,
      //   firstLabel: surveysQuestion.firstLabel,
      //   lastLabel: surveysQuestion.lastLabel,
      //   image: surveysQuestion.image,
      //   required: surveysQuestion.required
      // });
      const survey = await getCustomRepository(SurveysRepository).findOne({ id: surveyId });
      surveysQuestion.surveys = survey;
      await this.save(surveysQuestion);
      const updatedSurveysQuestion = await this.findOne(id);
      Promise.all(surveysQuestion.surveysQuestionOption.map(option => 
        getCustomRepository(SurveysQuestionOptionRepository).updateQuestionOptionById(option.id, option, id, next)
      ));

      return updatedSurveysQuestion
        ? updatedSurveysQuestion
        : next({ status: 404, message: "Surveys Option is not found" }, null);
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async deleteSurveysQuestionById(id: string, next?) {
    try {
      const surveysQuestion = await this.findOne(id);
      if (!surveysQuestion) {
        return next(
          { status: 404, message: "Surveys Option is not found" },
          null
        );
      }
      await this.delete({ id });
      return {};
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }
}

export default SurveysQuestionRepository;
