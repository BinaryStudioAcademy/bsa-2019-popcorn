import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Surveys } from "../entities/Surveys";
import { Surveys as SurveysModel } from "../models/SurveysModel";
import UserRepository from "./user.repository";
import { SurveysQuestion } from "../models/SurveysQuestionModel";
import SurveysQuestionRepository from "./surveysQuestion.repository";

@EntityRepository(Surveys)
class SurveysRepository extends Repository<Surveys> {
  async createSurveys(
    id: string,
    surveys: SurveysModel,
    surveysQuestion: SurveysQuestion[],
    next?
  ) {
    try {
      const user = await getCustomRepository(UserRepository).findOne(id);

      if (!user) {
        return next({ status: 404, message: "User is not found" }, null);
      }
      surveys.user = user;

      await Promise.all(
        surveysQuestion.map(so =>
          getCustomRepository(SurveysQuestionRepository).createSurveysQuestion(
            so,
            next
          )
        )
      );

      surveys.surveysQuestion = surveysQuestion;
      return await this.save(surveys);
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async getSurveys(next?) {
    try {
      const a = await this.find({
        order: {
          created_at: "DESC"
        },
        relations: [
          "surveysQuestion",
          "surveysQuestion.surveysQuestionOption",
          "surveysQuestion.surveysQuestionAnswer",
          "surveysQuestion.surveysQuestionAnswer.user",
          "surveysQuestion.surveysQuestionAnswer.surveysQuestionOption",
          "user"
        ]
      });
      return a;
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async getNewestSurvey(next?) {
    try {
      const a = await this.findOne({
        order: {
          created_at: "DESC"
        },
        relations: [
          "surveysQuestion",
          "surveysQuestion.surveysQuestionOption",
          "surveysQuestion.surveysQuestionAnswer",
          "surveysQuestion.surveysQuestionAnswer.user",
          "surveysQuestion.surveysQuestionAnswer.surveysQuestionOption",
          "user"
        ]
      });
      return a;
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async getSurveysById(id: string, next?) {
    try {
      const surveys = await this.findOne(
        { id },
        {
          relations: [
            "surveysQuestion",
            "surveysQuestion.surveysQuestionOption",
            "surveysQuestion.surveysQuestionAnswer",
            "surveysQuestion.surveysQuestionAnswer.user",
            "surveysQuestion.surveysQuestionAnswer.surveysQuestionOption",
            "user"
          ]
        }
      );
      if (!surveys) {
        return { status: 404, message: "Surveys is not found" };
      }
      return surveys;
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async getSurveysByTitle(title: string) {
    return await this.find({
      relations: ["user"],
      where: `title ILIKE '%${title}%'`
    });
  }

  async getSurveysByUserId(id: string, next?) {
    try {
      const user = await getCustomRepository(UserRepository).findOne(id);
      if (!user) {
        return next({ status: 404, message: "User is not found" }, null);
      }

      return await this.find({
        where: { user },
        order: {
          created_at: "DESC"
        },
        relations: [
          "surveysQuestion",
          "surveysQuestion.surveysQuestionOption",
          "surveysQuestion.surveysQuestionAnswer",
          "surveysQuestion.surveysQuestionAnswer.user",
          "surveysQuestion.surveysQuestionAnswer.surveysQuestionOption",
          "user"
        ]
      });
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async updateSurveysById(id: string, surveys: SurveysModel, next?) {
    try {
      const updatedSurveys = await this.getSurveysById(id, next);
      if (!updatedSurveys) {
        next({ status: 404, message: "Voiting is not found" }, null);
      }

      return await this.update(
        { id },
        {
          title: surveys.title,
          description: surveys.description,
          type: surveys.type
        }
      );
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async deleteSurveysById(id: string, next?) {
    try {
      const surveys = await this.getSurveysById(id, next);
      if (!surveys) {
        return next({ status: 404, message: "Voiting is not found" }, null);
      }

      await this.delete({ id });
      return {};
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }
}

export default SurveysRepository;
