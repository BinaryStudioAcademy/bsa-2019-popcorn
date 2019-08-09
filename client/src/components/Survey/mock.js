export default [
    {
      "id": "1",
      "created_at": new Date(2019, 7, 4, 5),
      "title": "Do velit esse esse est in eu magna.",
      "description": "Duis sunt fugiat consequat cillum culpa ex labore mollit magna proident. Consequat aliqua aute laboris aliqua.",
      "user_id": "1",
      "user": {
        "name": "Hannah",
        "image_link": "https://i.pravatar.cc/300?img=5"
      },
      "participants": 2,
      "questions": [
        {
          "id": "1",
          "survey_id": "1",
          "title": "In occaecat amet cupidatat exercitation ullamco sit esse ut incididunt enim labore aute laboris.",
          "firstLabel": "",
          "lastLabel": "",
          "type": "Checkboxes",
          "image_link": "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          "required": true,
          "options": [
            {
              "id": "1",
              "question_id": "1",
              "value": "First value"
            },
            {
              "id": "2",
              "question_id": "1",
              "value": "Second value"
            },
            {
              "id": "3",
              "question_id": "1",
              "value": "Third value"
            }
          ],
          "answers": [
            {
              "id": "1",
              "question_id": "1",
              "option_id": "2",
              "user_id": "2",
              "value": ""
            },
            {
              "id": "2",
              "question_id": "1",
              "option_id": "1",
              "user_id": "1",
              "value": ""
            }
          ]
        },
        {
          "id": "2",
          "survey_id": "1",
          "title": "Eu fugiat ex eiusmod veniam consequat aute Lorem sunt cillum.",
          "firstLabel": "",
          "lastLabel": "",
          "type": "Multiple choice",
          "image_link": "",
          "required": true,
          "options": [
            {
              "id": "4",
              "question_id": "2",
              "value": "Good"
            },
            {
              "id": "5",
              "question_id": "2",
              "value": "Bad"
            },
            {
              "id": "6",
              "question_id": "2",
              "value": "Normal"
            }
          ],
          "answers": [
            {
              "id": "4",
              "question_id": "2",
              "option_id": "5",
              "user_id": "1",
              "value": ""
            },
            {
                "id": "5",
                "question_id": "2",
                "option_id": "6",
                "user_id": "1",
                "value": ""
            },
            {
              "id": "6",
              "question_id": "2",
              "option_id": "6",
              "user_id": "2",
              "value": ""
            }
          ]
        }
      ]
    },
    {
      "id": "2",
      "created_at": new Date(19, 7, 8, 23),
      "title": "Mollit fugiat commodo duis excepteur occaecat deserunt nulla.",
      "description": "Enim quis enim officia duis irure. Minim anim magna quis laboris et.",
      "user_id": "5d4c7cb849b0ad1df1c42593",
      "user": {
        "name": "Parsons",
        "image_link": "https://i.pravatar.cc/300?img=5"
      },
      "participants": 2,
      "questions": [
        {
          "id": "3",
          "survey_id": "2",
          "title": "Aliqua officia amet cupidatat do ad pariatur aliqua ea proident anim consectetur amet nisi mollit.",
          "firstLabel": "good",
          "lastLabel": "bad",
          "type": "Linear scale",
          "image_link": "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          "required": true,
          "options": [
            {
              "id": "7",
              "question_id": "3",
              "value": "1"
            },
            {
              "id": "8",
              "question_id": "3",
              "value": "2"
            },
            {
              "id": "9",
              "question_id": "3",
              "value": "3"
            }
          ],
          "answers": [
            {
              "id": "10",
              "question_id": "3",
              "option_id": "8",
              "user_id": "1",
              "value": ""
            },
            {
              "id": "11",
              "question_id": "3",
              "option_id": "9",
              "user_id": "2",
              "value": ""
            }
          ]
        },
        {
          "id": "4",
          "survey_id": "2",
          "title": "Officia tempor officia pariatur nulla magna aliquip velit nostrud culpa quis pariatur nisi.",
          "firstLabel": "",
          "lastLabel": "",
          "type": "Short Answer",
          "image_link": "",
          "required": true,
          "options": [
            {
              "id": "10",
              "question_id": "4",
              "value": "good"
            }
        ],
          "answers": [
            {
              "id": "12",
              "question_id": "4",
              "option_id": "10",
              "user_id": "1",
              "value": "Cool"
            },
            {
              "id": "13",
              "question_id": "4",
              "option_id": "10",
              "user_id": "2",
              "value": "Worst"
            }
          ]
        }
      ]
    }
  ]