import {EntityRepository, Repository} from "typeorm";
import {Surveys} from "../entities/Surveys";
import {Surveys as SurveysModel} from "../models/SurveysModel";
import UserRepository from "./user.repository";
import {getCustomRepository} from "typeorm";
import { SurveysQuestion } from "../models/SurveysQuestionModel";
import SurveysQuestionRepository from "./surveysQuestion.repository";

@EntityRepository(Surveys)
class SurveysRepository extends Repository<SurveysModel> {

  async createSurveys(id: string, surveys: SurveysModel, surveysQuestion: Array<SurveysQuestion>, next?) {
    console.log('create', id, surveys,surveysQuestion)
    try {
      const user = await getCustomRepository(UserRepository).findOne(id); 
      if (!user) {
        return next({status: 404, message: 'User is not found'}, null);
      }
      surveys.user = user;

      await Promise.all(surveysQuestion.map(so => getCustomRepository(SurveysQuestionRepository).createSurveysQuestion(so, next)));

      surveys.surveysQuestion = surveysQuestion;
      return await this.save(surveys);
    } catch(err) {
      
      return next({status: err.status, message: err.message}, null);
    }
  }

  async getSurveys(next?) {
    try {
      const a = await this.find({
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
    } catch(err) {
      return next({status: err.status, message: err.message}, null);
    }
  }

  async getSurveysById(id: string, next?) {
    try {
      const surveys = await this.findOne(id);
      if (!surveys) 
        return next({status: 404, message: 'Surveys is not found'}, null);
      return await this.findOne(id);
    } catch(err) {
      return next({status: err.status, message: err.message}, null);
    } 
  }

  async getSurveysByUserId(id: string, next?) {
    try {
      const user = await getCustomRepository(UserRepository).findOne(id);
      if (!user)
        return next({status: 404, message: 'User is not found'}, null);
      return await this.find({user});
    } catch(err) {
      return next({status: err.status, message: err.message}, null);
    }
  }

  async updateSurveysById(id: string, surveys: SurveysModel, next?) {
    try {
      const updatedSurveys = await this.getSurveysById(id, next);
      if (!updatedSurveys) next({status: 404, message: 'Voiting is not found'}, null);

      await this.update({ id }, {title: surveys.title, description: surveys.description});
      Promise.all(surveys.surveysQuestion.map(question => {
        console.log(question)
        getCustomRepository(SurveysQuestionRepository).updateSurveysQuestionById(question.id, question, id, next)
      }));
     
    } catch(err) {
      return next({status: err.status, message: err.message}, null);
    }
  }

  async deleteSurveysById(id: string, next?) {
    try {
      const surveys = await this.getSurveysById(id, next);
      if (!surveys)
        return next({status: 404, message: 'Voiting is not found'}, null);
      await this.delete({ id });
      return {};
    } catch(err) {
      return next({status: err.status, message: err.message}, null);
    }
  }
}

export default SurveysRepository;