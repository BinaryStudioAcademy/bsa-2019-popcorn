import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";
import SurveyRepository from "../repository/surveys.repository";
import SurveyQuestionRepository from "../repository/surveysQuestion.repository";
import SurveyQuestionOptionRepository from "../repository/surveysQuestionOption.repository";
import { Surveys } from "../models/SurveysModel";
import { SurveysQuestion } from "../models/SurveysQuestionModel";
import { SurveysQuestionOption } from "../models/SurveysQuestionOption";

export class SeedSurvey1566123343520 implements MigrationInterface {
  public async up(): Promise<any> {
    const surveySeed = [
      {
        id: "32175862-ef31-483a-8655-49cb7eaea5b2",
        created_at: "2019-08-15T06:16:58.290Z",
        title: "What about TV-series ?",
        description: "Few questions about TV-series",
        type: "Open",
        user_id: "1",
        user: {
          name: "Parsons",
          image_link: "https://i.pravatar.cc/300?img=5"
        },
        participants: 0,
        questions: [
          {
            id: "bde0eb20-0833-4a47-8df8-e818be6fc41a",
            index: 0,
            survey_id: "32175862-ef31-483a-8655-49cb7eaea5b2",
            title: "1.What do you prefer ?",
            firstLabel: "",
            lastLabel: "",
            type: "Checkboxes",
            image_link: "",
            required: true,
            options: [
              {
                id: "a776de00-78cb-46af-9851-3db492a4e34a",
                index: 0,
                question_id: "bde0eb20-0833-4a47-8df8-e818be6fc41a",
                value: "1) Game Of Throne"
              },
              {
                id: "d8b157a0-d179-4d01-8ecb-b00a18c1e3b2",
                index: 1,
                question_id: "bde0eb20-0833-4a47-8df8-e818be6fc41a",
                value: "2) Breaking Bad"
              },
              {
                id: "5307fb62-cf82-40cc-8eae-fa3a512e9054",
                index: 2,
                question_id: "bde0eb20-0833-4a47-8df8-e818be6fc41a",
                value: "3) Stranger Things"
              },
              {
                id: "0beaa47b-570b-4c2e-bf50-773bee5af329",
                index: 3,
                question_id: "bde0eb20-0833-4a47-8df8-e818be6fc41a",
                value: "4) Narcos"
              }
            ],
            answers: []
          },
          {
            id: "09beeeea-b676-4f17-a903-fcc84ef98f7c",
            index: 1,
            survey_id: "32175862-ef31-483a-8655-49cb7eaea5b2",
            title: "2. HBO VS NETFLIX",
            type: "Linear scale",
            required: true,
            options: [
              {
                id: "cdd31a4d-3f5b-4895-8383-776815e9ea9b",
                index: 0,
                question_id: "09beeeea-b676-4f17-a903-fcc84ef98f7c",
                value: "1"
              },
              {
                id: "dcaf3587-1a55-445f-93c2-07719d518d15",
                index: 1,
                question_id: "09beeeea-b676-4f17-a903-fcc84ef98f7c",
                value: "2"
              },
              {
                id: "81f5c596-3eea-46a2-a740-cc77fb08a8f5",
                index: 2,
                question_id: "09beeeea-b676-4f17-a903-fcc84ef98f7c",
                value: "3"
              },
              {
                id: "87255b08-9fcd-4425-a621-9bbe075ab132",
                index: 3,
                question_id: "09beeeea-b676-4f17-a903-fcc84ef98f7c",
                value: "4"
              },
              {
                id: "b534ff45-4fd6-46b7-8886-5aedc6a7fb52",
                index: 4,
                question_id: "09beeeea-b676-4f17-a903-fcc84ef98f7c",
                value: "5"
              },
              {
                id: "b6ef1bb7-a51f-4d7b-bf3d-01187a8aac56",
                index: 5,
                question_id: "09beeeea-b676-4f17-a903-fcc84ef98f7c",
                value: "6"
              },
              {
                id: "ca225a69-aacf-4c55-8c71-ca35e91dbf14",
                index: 6,
                question_id: "09beeeea-b676-4f17-a903-fcc84ef98f7c",
                value: "7"
              }
            ],
            answers: [],
            firstLabel: "HBO",
            lastLabel: "NETFLIX"
          },
          {
            id: "86612a53-3098-4dc5-896f-104edd1bc07b",
            index: 2,
            survey_id: "32175862-ef31-483a-8655-49cb7eaea5b2",
            title: "3. Favourite TV-series",
            type: "Short Answer",
            required: true,
            options: [],
            answers: []
          }
        ]
      },
      {
        id: "04bbfad6-8fbe-42cb-8b2d-3e503290a25e",
        created_at: "2019-08-15T06:27:16.474Z",
        title: "Batman Actors",
        description: "Choose best batman actor",
        type: "Open",
        user_id: "1",
        user: {
          name: "Parsons",
          image_link: "https://i.pravatar.cc/300?img=5"
        },
        participants: 0,
        questions: [
          {
            id: "664cc78a-2db8-4cb7-adfe-a94db46c1067",
            index: 0,
            survey_id: "04bbfad6-8fbe-42cb-8b2d-3e503290a25e",
            title: "1. Which batman do you like more",
            firstLabel: "",
            lastLabel: "",
            type: "Checkboxes",
            image_link: "",
            required: true,
            options: [
              {
                id: "3581c156-f320-4bb5-bb57-36e1a6280843",
                index: 0,
                question_id: "664cc78a-2db8-4cb7-adfe-a94db46c1067",
                value: "1) George Clooney"
              },
              {
                id: "468d3b1a-61bb-40d6-9f07-356912ddc1a2",
                index: 1,
                question_id: "664cc78a-2db8-4cb7-adfe-a94db46c1067",
                value: "2) Ben Affleck"
              },
              {
                id: "dbfd3480-66a8-45f7-92e1-7a3e746ae78f",
                index: 2,
                question_id: "664cc78a-2db8-4cb7-adfe-a94db46c1067",
                value: "3) Michael Keaton"
              },
              {
                id: "c6a372d0-4f40-400a-8de7-e076ff574dad",
                index: 3,
                question_id: "664cc78a-2db8-4cb7-adfe-a94db46c1067",
                value: "4) Adam West"
              },
              {
                id: "2d1e671b-b7f2-4126-a6c3-35d1bc173dfe",
                index: 4,
                question_id: "664cc78a-2db8-4cb7-adfe-a94db46c1067",
                value: "5) Christian Bale"
              }
            ],
            answers: []
          }
        ]
      },
      {
        id: "c8862df0-5a4c-4623-bb44-44fe49cd79e3",
        created_at: "2019-08-15T06:33:59.424Z",
        title: "Who do you think should sit the Iron Throne?",
        description: "The holivar will begin",
        type: "Open",
        user_id: "1",
        user: {
          name: "Parsons",
          image_link: "https://i.pravatar.cc/300?img=5"
        },
        participants: 0,
        questions: [
          {
            id: "bb13a86a-21aa-4dd0-9806-4cc7110ac869",
            index: 0,
            survey_id: "c8862df0-5a4c-4623-bb44-44fe49cd79e3",
            title: "1. King/Queen of the Andals and the First Men",
            firstLabel: "",
            lastLabel: "",
            type: "Checkboxes",
            image_link: "",
            required: false,
            options: [
              {
                id: "7dd0d950-5d89-485b-bddb-0f8706ee1a8c",
                index: 0,
                question_id: "bb13a86a-21aa-4dd0-9806-4cc7110ac869",
                value: "1) Daenerys"
              },
              {
                id: "e622fded-4a1f-4d86-9085-8ddcf152ff3b",
                index: 1,
                question_id: "bb13a86a-21aa-4dd0-9806-4cc7110ac869",
                value: "2) Cersei"
              },
              {
                id: "9b31cede-8b24-439b-937c-966da1f68d01",
                index: 2,
                question_id: "bb13a86a-21aa-4dd0-9806-4cc7110ac869",
                value: "3) Jon"
              },
              {
                id: "12a45264-876e-4d9b-aaa5-6fbce5befa8e",
                index: 3,
                question_id: "bb13a86a-21aa-4dd0-9806-4cc7110ac869",
                value: "4) Tyrion"
              },
              {
                id: "4a9b653b-424e-4f82-8fe2-562891f20614",
                index: 4,
                question_id: "bb13a86a-21aa-4dd0-9806-4cc7110ac869",
                value: "5) Sansa"
              },
              {
                id: "cb03a077-d142-4ed0-a2f4-83550b969349",
                index: 5,
                question_id: "bb13a86a-21aa-4dd0-9806-4cc7110ac869",
                value: "6) Bran"
              },
              {
                id: "9149a2e3-0d60-4949-9033-08e0cf741b0f",
                index: 6,
                question_id: "bb13a86a-21aa-4dd0-9806-4cc7110ac869",
                value: "7) The Night King"
              }
            ],
            answers: []
          }
        ]
      }
    ];

    const createOptions = (optionsData, question) =>
      optionsData.map(async optionData => {
        const option = new SurveysQuestionOption();
        option.title = optionData.value;
        option.index = optionData.index;
        option.surveysQuestion = question;
        const newOption = await getCustomRepository(
          SurveyQuestionOptionRepository
        ).createQuestionOption(option);
        return newOption;
      });

    const createQuestions = (questionsData, survey) =>
      questionsData.map(async questionData => {
        const question = new SurveysQuestion();
        question.title = questionData.title;
        question.index = questionData.index;
        question.firstLabel = questionData.firstLabel;
        question.lastLabel = questionData.lastLabel;
        question.surveys = survey;
        question.type = questionData.type;
        question.image = questionData.image_link;
        question.required = questionData.required;
        const newQuestion = await getCustomRepository(
          SurveyQuestionRepository
        ).save(question);
        createOptions(questionData.options, newQuestion);
        return newQuestion;
      });

    surveySeed.map(async surveyData => {
      const survey = new Surveys();
      survey.title = surveyData.title;
      survey.description = surveyData.description;
      const user = await getCustomRepository(UserRepository).getByEmail(
        "test@gmail.com"
      );
      survey.user = user;
      const newSurvey = await getCustomRepository(SurveyRepository).save(
        survey
      );
      createQuestions(surveyData.questions, newSurvey);
    });
  }

  public async down(): Promise<any> {}
}
