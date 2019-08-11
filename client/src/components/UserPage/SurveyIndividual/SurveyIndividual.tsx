import React, { PureComponent } from 'react';
import SurveySingleAnswer from '../SurveyItems/SurveySingleAnswer/SurveySingleAnswer';
import SurveyMultipleAnswer from '../SurveyItems/SurveyMultipleAnswer/SurveyMultipleAnswer';
import SurveyShortAnswer from '../SurveyItems/SurveyShortAnswer/SurveyShortAnswer';
import SurveyLinearScale from '../SurveyItems/SurveyLinearScale/SurveyLinearScale';
import './../Survey/Survey.scss';
import "./SurveyIndividual.scss";

interface IProps {
    surveyInfo: {
        participants: number,
        questions: Array<{
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
            }>,
            answers: Array<{
                id: string,
                question_id: string,
                option_id?: string,
                user_id: string,
                value: string
            }>
        }>
    }
};

interface IState {
    answers: Array<{
        questionId: string,
        options: Array<{
            id: string
        }>
    }>,
    isShown: boolean
}

class SurveyIndividual extends PureComponent<IProps, IState> {
    constructor(props){
        super(props);
        this.state = {
            answers: props.surveyInfo.questions.map(question => ({
                questionId: question.id,
                options: []
            })),
            isShown: false
        };
    }

    setSingleAnswer = (answerInfo) => {
        const { questionId, optionId } = answerInfo;
        const newAnswers = this.state.answers.map(answer => {
            if (answer.questionId === questionId) {
                answer.options = [{ id: optionId }];
            }
            return answer;
        }
        );
        
        this.setState({ 
            answers: newAnswers
        });
    }

    setMultipleAnswer = (answerInfo) => {
        const { questionId, optionId, value } = answerInfo;
        let answers = this.state.answers;
        if (value === true) {
            answers = answers.map(answer => {
                if (answer.questionId === questionId) {
                    answer.options.push({ id: optionId });
                }
                return answer;
            });
        } else {
                answers = answers.map((answer, i) => {
                if (answer.questionId === questionId) {
                    answer.options.forEach((option, i) => {
                        if (optionId === option.id) {
                            answer.options.splice(i, 1);
                        }
                    });
                }
                return answer;
            });
        }

        this.setState({
            answers
        });
    }

    render() {
        const { surveyInfo } = this.props;
        const { questions } = surveyInfo;
        return (
            <div className="survey">
                <div className="survey-background" />
                <form>
                    <div className="form-header" />
                    {   
                        questions.map((question, i) => {
                            if (question.type === 'Multiple choice') {
                                return (
                                    <SurveySingleAnswer 
                                        key={i} 
                                        questionInfo={question} 
                                        setAnswer={this.setSingleAnswer}
                                    />
                                );
                            }
                            else if (question.type === 'Checkboxes') {
                                return (
                                    <SurveyMultipleAnswer 
                                        key={i} 
                                        questionInfo={question} 
                                        setAnswer={this.setMultipleAnswer}
                                    />
                                )
                            }

                            else if (question.type === 'Short Answer') {
                                return (
                                    <SurveyShortAnswer
                                        key={i}
                                        questionInfo={question}
                                    />
                                )
                            }

                            else return (
                                <SurveyLinearScale 
                                    key={i}
                                    questionInfo={question}
                                />
                            )
                            
                        })
                    }
                </form>
            </div>
        )
    }
};

export default SurveyIndividual;