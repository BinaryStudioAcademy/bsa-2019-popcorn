import React, { PureComponent } from 'react';
import './Survey.scss';
import SurveySingleAnswer from '../SurveySingleAnswer/SurveySingleAnswer';
import SurveyMultipleAnswer from '../SurveyMultipleAnswer/SurveyMultipleAnswer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import ReactTimeAgo from 'react-time-ago';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
JavascriptTimeAgo.locale(en);


interface IProps {
    surveyInfo: {
        created_at: Date
        name: string,
        userInfo: {
            name: string,
            image_url: string
        },
        description: string,
        participants: number,
        questions: Array<{
            id: string,
            question: string,
            options: Array<{
                text: string,
                id: string
            }>,
            type: string
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

class Survey extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        console.log(props);
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

    sendAnswer = () => {
        this.setState({ isShown: false });
        if (this.state.answers.some(answer => answer.options.length === 0)) {
            this.setState({ isShown: true });
            return;
        }
        console.log(this.state.answers);
    }

    render() {
        const { surveyInfo } = this.props;
        const { userInfo, created_at, participants, name, description, questions } = surveyInfo;
        return (
            <div className="survey">
                <div className="survey-background" />
                <form>
                    <div className="form-header" />
                    <div className="info">
                        <img src={userInfo.image_url} alt=""/>
                        <span>{userInfo.name}</span>
                        <ReactTimeAgo date={created_at} timeStyle="twitter" locale="ru"/>
                        <span className="participants">{participants} <FontAwesomeIcon icon={faUsers} /></span>
                    </div>
                    <header>
                        <h1>{name}</h1>
                        <p>{description}</p>
                    </header>
                    {   
                        questions.map((question, i) => {
                            if (question.type === 'single') {
                                return (
                                    <SurveySingleAnswer 
                                        key={i} 
                                        questionInfo={question} 
                                        setAnswer={this.setSingleAnswer}
                                    />
                                );
                            }
                            return (
                                <SurveyMultipleAnswer 
                                    key={i} 
                                    questionInfo={question} 
                                    setAnswer={this.setMultipleAnswer}
                                />
                            )
                        })
                    }
                    <div className="button" >
                        {this.state.isShown && (<p>Oops, seems like you didn't answer some questions. Fix it!</p>)}
                        <button type="button" onClick={this.sendAnswer}>Send</button>
                    </div>
                </form>
            </div>
        )
    }
};

export default Survey;