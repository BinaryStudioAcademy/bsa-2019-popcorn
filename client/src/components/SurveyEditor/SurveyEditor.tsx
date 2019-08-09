import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import MultipleChoice from '../SurveyEditorItems/MultipleChoice';
import ShortAnswer from '../SurveyEditorItems/ShortAnswer';

const QUESTION_TYPES = [ "Multiple choice", "Checkboxes", "Short Answer", "Linear scale" ];

interface IQuestion { 
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
}

interface ISurvey {
    id: string,
    created_at: Date,
    title: string,
    description: string,
    user_id: string,
    user: {
        name: string,
        image_link: string
    },
    participants: number,
    questions: Array<IQuestion>
}

interface IProps {
    mainPath: string,
    surveyInfo: ISurvey
}


class SurveyEditor extends Component<IProps, ISurvey> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            ...props.surveyInfo
        }
    }

    onChangeTitle = (event) => {
        this.setState({ title: event.target.value });
    }

    onChangeDescription = (event) => {
        this.setState({ description: event.target.value });
    }

    addQuestion = () => {
        const id = uuid();
        const newQuestion: IQuestion = {
            id,
            survey_id: this.state.id,
            title: '',
            type: 'Multiple choice',
            required: false,
            options: [{
                id: uuid(),
                question_id: id,
                value: 'Option 1'
            }],
            answers: []
        };

        const questions = this.state.questions;
        questions.push(newQuestion);
        this.setState({ ...this.state, questions });
    }

    duplicateQuestion = (question) => {
        const questions = this.state.questions;
        questions.push({ ...question, id: uuid() });

        this.setState({ ...this.state, questions });
    } 

    deleteQuestion = (index) => {
        let { questions } = this.state;
        questions.splice(index, 1);

        this.setState({ ...this.state, questions });
    }

    changeType = (event, id) => {
        const questions = this.state.questions.map(question => {
            if (question.id === id) {
                return { ...question, type: event.target.value }
            };
            return question;
        });

        this.setState({ ...this.state, questions });
    }

    changeRequirement = (id) => {
        const questions = this.state.questions.map(question => {
            if (question.id === id) {
                return { ...question, required: !question.required }
            };
            return question;
        });

        this.setState({ ...this.state, questions });
    }

    changeQuestionTitle = (event, id) => {
        const questions = this.state.questions.map(question => {
            if (question.id === id) {
                return { ...question, title: event.target.value }
            };
            return question;
        });

        this.setState({ ...this.state, questions });
    }

    changeQuestion = (newQuestion) => {
        const questions = this.state.questions.map(question => {
            if (question.id === newQuestion.id) {
                return newQuestion
            };
            return question;
        });

        this.setState({ ...this.state, questions });
    }

    onSave = () => {
        console.log(this.state);
    }

    render() {
        const { mainPath } = this.props;
        const { title, description, questions } = this.state;

        return (
            <div>
                <NavLink
                    to={`${mainPath}/preview`}
                >
                    <div>preview</div>
                </NavLink>
                <form>
                    <input 
                        type="text" 
                        value={title} 
                        placeholder="Title" 
                        className="survey-title" 
                        onChange={this.onChangeTitle} 
                    />
                    <textarea 
                        onChange={this.onChangeDescription} 
                        placeholder="Description" 
                        value={description} 
                    />
                    {
                        questions.map((question, i) => {
                            let element; 
                            if (question.type === 'Multiple choice')
                                element = (<MultipleChoice questionInfo={question} />);
                            else if (question.type === 'Checkboxes')
                                element = (<MultipleChoice questionInfo={question} />);
                            else if (question.type === 'Linear scale')
                                element = (<div>Linear scale</div>);
                            else element = (<ShortAnswer changeQuestion={this.changeQuestion} questionInfo={question} />);

                            return (
                                <div key={i}>
                                <input 
                                        type="text" 
                                        className="question-title"
                                        onChange={(event) => { this.changeQuestionTitle(event, question.id) }} 
                                        value={question.title} 
                                        placeholder="question" 
                                    />
                                    <select 
                                        className="question-type"
                                        value={question.type} 
                                        onChange={(event) => { this.changeType(event, question.id) }}
                                    >
                                        {
                                            QUESTION_TYPES.map((type, i) => (
                                                <option 
                                                    key={i}
                                                    value={type} 
                                                    selected={type === question.type}
                                                >
                                                    {type}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    {element}
                                    <button type="button" onClick={this.addQuestion}>Add question</button>
                                    <button type="button" onClick={() => {this.duplicateQuestion(question)}}>
                                        Duplicate question
                                    </button>
                                    <button type="button" onClick={() => {this.deleteQuestion(i)}}>
                                        Delete
                                    </button>
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            checked={question.required} 
                                            onChange={() => { this.changeRequirement(question.id) }} />
                                        Required
                                    </label>
                                </div>
                            )
                        })
                    }

                    <button type="button" onClick={this.onSave}>Save</button>
                </form>
            </div>
        )
    }
}

export default SurveyEditor;