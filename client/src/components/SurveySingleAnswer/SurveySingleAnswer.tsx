import React from 'react';
import './SurveySingleAnswer.scss';

interface IAnswer {
    questionId: string,
    optionId: string
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
    setAnswer: (data : IAnswer) => void
};

const SurveySingleAnswer = (props: IProps) => {
    const { questionInfo } = props;
    const { id, question, options } = questionInfo;

    return (
        <div className="question-container single">
            <p className="survey-question">{question}</p>
            {
                options.map((option, i) => (
                    <p key={i}>
                        <label>
                            <input 
                                type="radio" 
                                name={id} 
                                key={i} 
                                value={option.text} 
                                onChange={() => {props.setAnswer({
                                    questionId: id,
                                    optionId: option.id
                                })}}
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

export default SurveySingleAnswer;