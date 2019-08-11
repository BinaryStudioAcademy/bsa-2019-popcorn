import React from 'react';
import './SurveyShortAnswer.scss';

interface IReadyAnswer {
    id: string,
    question_id: string,
    option_id?: string,
    user_id: string,
    value: string
};

interface IProps {
    questionInfo: {
        id: string,
            survey_id: string,
            title: string,
            firstLabel?: string,
            lastLabel?: string,
            type: string,
            image_link?: string,
            required: boolean,
            options?: Array<{
                id: string,
                question_id: string,
                value: string
            }>
    },
    disable?: boolean,
    answer?: IReadyAnswer
};

const SurveyShortAnswer = (props: IProps) => {
    const { questionInfo, disable, answer } = props;
    const { title, required, image_link } = questionInfo;

    return (
        <div className="question-container short-answer">
            <p className={`survey-question required-${required}`}>{title}</p>
            <input
                type="text"
                placeholder="My answer"
                disabled={disable || false}
                value = {
                    answer && answer.value
                }
            />
            {
                image_link &&
                <img className="question-image" alt="" src={image_link} />
            }
        </div>
    );
};

export default SurveyShortAnswer;