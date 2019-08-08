import React from 'react';
import './SurveySingleAnswer.scss';

interface IAnswer {
    questionId: string,
    optionId: string
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
    setAnswer: (data : IAnswer) => void
};

const SurveySingleAnswer = (props: IProps) => {
    const { questionInfo } = props;
    const { id, title, options } = questionInfo;

    return (
        <div className="question-container single">
            <p className="survey-question">{title}</p>
            {   options!==undefined &&
                options.map((option, i) => (
                    <p key={i}>
                        <label>
                            <input 
                                type="radio" 
                                name={id} 
                                key={i} 
                                value={option.value} 
                                onChange={() => {props.setAnswer({
                                    questionId: id,
                                    optionId: option.id
                                })}}
                            /> 
                            <span className="checkmark"></span>
                            {option.value}
                        </label>
                    </p>
                ))
            }
        </div>
    )
};

export default SurveySingleAnswer;