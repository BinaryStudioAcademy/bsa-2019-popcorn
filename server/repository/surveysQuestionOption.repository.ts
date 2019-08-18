import { getCustomRepository } from "typeorm";
import { EntityRepository, Repository } from "typeorm";
import { SurveysQuestionOption as SurveysQuestionOptionEntity } from "../entities/SurveysQuestionOption";

import { SurveysQuestionOption } from "../models/SurveysQuestionOption";

import SurveysQuestionRepository from "./surveysQuestion.repository";

@EntityRepository(SurveysQuestionOptionEntity)
class SurveysQuestionOptionRepository extends Repository<
  SurveysQuestionOption
> {
  async createQuestionOption(option, next?) {
    try {
      return await this.save(option);
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async getQuestionOptionByQuestionId(id: string, next?) {
    try {
      const surveysQuestion = await getCustomRepository(
        SurveysQuestionRepository
      ).getSurveysQuestionById(id, next);

      if (!surveysQuestion) {
        return next({ status: 404, message: "Surveys is not found" }, null);
      }
      return await this.find({ surveysQuestion });
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async updateQuestionOptionById(
    id: string,
    surveysQuestionOption: SurveysQuestionOption,
    surveysQuestionId: string,
    next?
  ) {
    try {
      const question = await getCustomRepository(
        SurveysQuestionRepository
      ).findOne({ id: surveysQuestionId });
      surveysQuestionOption.surveysQuestion = question;
      await this.save(surveysQuestionOption);
      const updatedQuestionOption = await this.findOne(id);
      return updatedQuestionOption
        ? updatedQuestionOption
        : next({ status: 404, message: "Surveys Option is not found" }, null);
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async deleteQuestionOptionById(id: string, next?) {
    try {
      const surveysQuestionOption = await this.findOne(id);
      if (!surveysQuestionOption) {
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

export default SurveysQuestionOptionRepository;
