import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import SurveysRepository from "../repository/surveys.repository";
import UserRepository from "../repository/user.repository";
import { Surveys } from "../entities/Surveys";
import { SurveysQuestion } from "../entities/SurveysQuestion";
import { SurveysQuestionOption } from "../entities/SurveysQuestionOption";
import { SurveysQuestionAnswer } from "../entities/SurveysQuestionAnswer";
import SurveysQuestionRepository from "../repository/surveysQuestion.repository";
import SurveysQuestionOptionRepository from "../repository/surveysQuestionOption.repository";
import SurveysQuestionAnswerRepository from "../repository/surveysQuestionAnswer.repository";

export class SeedSurveys1565789734851 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const { data } = await getCustomRepository(UserRepository).getUserById(
      "7f13634d-c353-433c-98fe-ead99e1252c7"
    );
    const user = data.user;

    const survey1 = new Surveys();
    survey1.title = "survey title";
    survey1.description = "survey description";
    survey1.created_at = new Date();
    survey1.updated_at = new Date();
    survey1.user = user;
    await getCustomRepository(SurveysRepository).save(survey1);

    //question 1
    const surveysQuestion1 = new SurveysQuestion();
    surveysQuestion1.surveys = survey1;
    surveysQuestion1.title = "question title";
    surveysQuestion1.firstLabel = "good";
    surveysQuestion1.lastLabel = "bad";
    surveysQuestion1.type = "Linear scale";
    surveysQuestion1.image =
      "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
    surveysQuestion1.required = true;
    await getCustomRepository(SurveysQuestionRepository).save(surveysQuestion1);

    const surveysQuestionOption1 = new SurveysQuestionOption();
    surveysQuestionOption1.surveysQuestion = surveysQuestion1;
    surveysQuestionOption1.title = "1";
    await getCustomRepository(SurveysQuestionOptionRepository).save(
      surveysQuestionOption1
    );

    const surveysQuestionOption11 = new SurveysQuestionOption();
    surveysQuestionOption11.surveysQuestion = surveysQuestion1;
    surveysQuestionOption11.title = "2";
    await getCustomRepository(SurveysQuestionOptionRepository).save(
      surveysQuestionOption11
    );

    const surveysQuestionOption12 = new SurveysQuestionOption();
    surveysQuestionOption12.surveysQuestion = surveysQuestion1;
    surveysQuestionOption12.title = "3";
    await getCustomRepository(SurveysQuestionOptionRepository).save(
      surveysQuestionOption12
    );

    const surveysQuestionAnswer1 = new SurveysQuestionAnswer();
    surveysQuestionAnswer1.user = user;
    surveysQuestionAnswer1.surveysQuestion = surveysQuestion1;
    surveysQuestionAnswer1.surveysQuestionOption = surveysQuestionOption1;
    await getCustomRepository(SurveysQuestionAnswerRepository).save(
      surveysQuestionAnswer1
    );

    //question 2
    const surveysQuestion2 = new SurveysQuestion();
    surveysQuestion2.surveys = survey1;
    surveysQuestion2.title = "second question title";
    surveysQuestion2.type = "Short Answer";
    surveysQuestion2.required = false;
    await getCustomRepository(SurveysQuestionRepository).save(surveysQuestion2);

    const surveysQuestionAnswer2 = new SurveysQuestionAnswer();
    surveysQuestionAnswer2.user = user;
    surveysQuestionAnswer2.surveysQuestion = surveysQuestion2;
    surveysQuestionAnswer2.value = "my short answer";
    await getCustomRepository(SurveysQuestionAnswerRepository).save(
      surveysQuestionAnswer2
    );

    //question 3
    const surveysQuestion3 = new SurveysQuestion();
    surveysQuestion3.surveys = survey1;
    surveysQuestion3.title = "question title";
    surveysQuestion3.type = "Checkboxes";
    surveysQuestion3.image =
      "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
    surveysQuestion3.required = true;
    await getCustomRepository(SurveysQuestionRepository).save(surveysQuestion3);

    const surveysQuestionOption2 = new SurveysQuestionOption();
    surveysQuestionOption2.surveysQuestion = surveysQuestion3;
    surveysQuestionOption2.title = "check box1";
    await getCustomRepository(SurveysQuestionOptionRepository).save(
      surveysQuestionOption2
    );

    const surveysQuestionOption21 = new SurveysQuestionOption();
    surveysQuestionOption21.surveysQuestion = surveysQuestion3;
    surveysQuestionOption21.title = "check box2";
    await getCustomRepository(SurveysQuestionOptionRepository).save(
      surveysQuestionOption21
    );

    const surveysQuestionAnswer3 = new SurveysQuestionAnswer();
    surveysQuestionAnswer3.user = user;
    surveysQuestionAnswer3.surveysQuestion = surveysQuestion3;
    surveysQuestionAnswer3.surveysQuestionOption = surveysQuestionOption21;
    await getCustomRepository(SurveysQuestionAnswerRepository).save(
      surveysQuestionAnswer3
    );

    //question 4
    const surveysQuestion4 = new SurveysQuestion();
    surveysQuestion4.surveys = survey1;
    surveysQuestion4.title = "very last question";
    surveysQuestion4.type = "Multiple choice";
    surveysQuestion4.image =
      "https://apps.shopifycdn.com/listing_images/9d449ae9a7b5bf7bf43384f9c2928478/icon/ff93e6ee0fad4dce532e720f42946825.png";
    surveysQuestion4.required = true;
    await getCustomRepository(SurveysQuestionRepository).save(surveysQuestion4);

    const surveysQuestionOption3 = new SurveysQuestionOption();
    surveysQuestionOption3.surveysQuestion = surveysQuestion4;
    surveysQuestionOption3.title = "choice 1";
    await getCustomRepository(SurveysQuestionOptionRepository).save(
      surveysQuestionOption3
    );

    const surveysQuestionOption31 = new SurveysQuestionOption();
    surveysQuestionOption31.surveysQuestion = surveysQuestion4;
    surveysQuestionOption31.title = "choice 2";
    await getCustomRepository(SurveysQuestionOptionRepository).save(
      surveysQuestionOption31
    );

    const surveysQuestionAnswer4 = new SurveysQuestionAnswer();
    surveysQuestionAnswer4.user = user;
    surveysQuestionAnswer4.surveysQuestion = surveysQuestion4;
    surveysQuestionAnswer4.surveysQuestionOption = surveysQuestionOption3;
    await getCustomRepository(SurveysQuestionAnswerRepository).save(
      surveysQuestionAnswer4
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
