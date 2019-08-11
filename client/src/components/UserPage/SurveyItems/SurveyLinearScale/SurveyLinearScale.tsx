import React from 'react';
import './SurveyLinearScale.scss';

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

const SurveyLinearScale = (props: IProps) => {
    const { questionInfo, disable, answer } = props;
    const { id, title, options, lastLabel, firstLabel, required, image_link } = questionInfo;

    return (
        <div className="question-container">
            <p className={`survey-question required-${required}`}>{title}</p>
            <div className="linear-scale">
                <span>{firstLabel}</span>
                {   
                    options !== undefined &&
                    options.map((option, i) => (
                        <p key={i} className="linear-scale-item">
                            <label>
                                {option.value}
                                <input 
                                    type="radio" 
                                    name={id}
                                    key={i} 
                                    value={option.value} 
                                    disabled={disable || false}
                                    checked={answer && (answer.option_id  === option.id)}
                                /> 
                                <span className="checkmark"></span>
                            </label>
                        </p>
                    ))
                }
                <span>{lastLabel}</span>
            </div>
            {
                image_link &&
                <img className="question-image" alt="" src={image_link} />
            }
        </div>
    );
};

export default SurveyLinearScale;