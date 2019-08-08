import React from 'react';
import './SurveyMultipleAnswer.scss';

interface IAnswer {
    questionId: string,
    optionId: string,
    value: boolean
};

interface IProps {
    questionInfo: {
        id: string,
        question: string,
        options: Array<{
            text: string,
            id: string
        }>
    },
    setAnswer: (data: IAnswer) => void
};

const SurveyMultipleAnswer = (props: IProps) => {
    const { questionInfo } = props;
    const { id, question, options } = questionInfo;

    return (
        <div className="multiple question-container">
            <p className="survey-question">{question}</p>
            {
                options.map((option, i) => (
                    <p key={i}>
                        <label>
                            <input 
                                type="checkbox" 
                                name={id}
                                key={i} 
                                value={option.text} 
                                onChange={(event) => {
                                    props.setAnswer({
                                        questionId: id,
                                        optionId: option.id,
                                        value: event.target.checked
                                    });
                                }}
                            /> 
                            <span className="checkmark"></span>
                            {option.text}
                        </label>
                    </p>
                ))
            }
        </div>
    )
};

export default SurveyMultipleAnswer;