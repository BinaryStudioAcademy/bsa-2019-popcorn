import { v4 as uuid } from 'uuid';
const surveyId = uuid();
const questionId = uuid();

export default () => ({
    "id": surveyId,
    "created_at": new Date(),
    "title": "",
    "description": "",
    "type": "Open",
    "user_id": "",
    "user": {
      
    },
    "participants": 0,
    "questions": [
      {
        "id": questionId,
        "survey_id": surveyId,
        "title": "",
        "firstLabel": "",
        "lastLabel": "",
        "type": "Multiple choice",
        "image_link": "",
        "required": false,
        "options": [
          {
            "id": uuid(),
            "question_id": questionId,
            "value": ""
          }
        ],
        "answers": [
          {
            "id": "1",
              "question_id": "1",
              "option_id": "2",
              "user_id": "2",
              "value": ""
          }
        ]
      }
    ]
})
