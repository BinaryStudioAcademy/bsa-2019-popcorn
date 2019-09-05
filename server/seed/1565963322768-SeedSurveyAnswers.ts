import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";
import { SurveysQuestionAnswer } from "../entities/SurveysQuestionAnswer";
import SurveysQuestionRepository from "../repository/surveysQuestion.repository";
import SurveysQuestionOptionRepository from "../repository/surveysQuestionOption.repository";
import SurveysQuestionAnswerRepository from "../repository/surveysQuestionAnswer.repository";

export class SeedSurveyAnswers1565963322768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const randomNumber = (max: number) => Math.floor(Math.random() * max);

    const generateSingleAnswer = async (user, question, options) => {
      const answer = new SurveysQuestionAnswer();
      answer.user = user;
      answer.surveysQuestion = question;
      answer.surveysQuestionOption = options[randomNumber(options.length)];
      answer.value = "";
      await getCustomRepository(SurveysQuestionAnswerRepository).save(answer);
    };

    const generateMultipleAnswer = async (user, question, options) => {
      const answer = new SurveysQuestionAnswer();
      answer.user = user;
      answer.surveysQuestion = question;
      answer.surveysQuestionOption = options[randomNumber(options.length)];
      answer.value = "";
      await getCustomRepository(SurveysQuestionAnswerRepository).save(answer);
    };

    const generateShortAnswer = async (user, question) => {
      const seed = [
        "Peaky Blinders",
        "Breaking Bad",
        "Game of Thrones",
        "Supernatural"
      ];
      const answer = new SurveysQuestionAnswer();
      answer.user = user;
      answer.surveysQuestion = question;
      answer.value = seed[randomNumber(seed.length)];
      await getCustomRepository(SurveysQuestionAnswerRepository).save(answer);
    };

    const generateAnswer = async (user, question) => {
      const options = await getCustomRepository(
        SurveysQuestionOptionRepository
      ).getQuestionOptionByQuestionId(question.id);
      switch (question.type) {
        case "Checkboxes":
          await generateSingleAnswer(user, question, options);
          break;
        case "Linear scale":
          await generateSingleAnswer(user, question, options);
          break;
        case "Multiple choice":
          await generateMultipleAnswer(user, question, options);
          break;
        case "Short Answer":
          await generateShortAnswer(user, question);
          break;
      }
    };
    setTimeout(async () => {
      const users = await getCustomRepository(UserRepository).find();
      users.forEach(async user => {
        const questions = await getCustomRepository(
          SurveysQuestionRepository
        ).find();
        questions.forEach(
          async question => await generateAnswer(user, question)
        );
      });
    }, 5000);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
