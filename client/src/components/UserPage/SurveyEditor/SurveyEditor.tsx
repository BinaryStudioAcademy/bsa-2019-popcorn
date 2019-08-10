import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import MultipleChoice from '../SurveyEditorItems/MultipleChoice';
import ShortAnswer from '../SurveyEditorItems/ShortAnswer';
import LinearScale from '../SurveyEditorItems/LinearScale';
import { Snackbar } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
 
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
    type: string,
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
    surveyInfo: ISurvey,
    updateInfo: (ISurvey) => void
    saveInfo: (ISurvey) => void
}

interface IState {
    snackbar: boolean,
    surveyInfo: ISurvey,
    isUploading: boolean,
    imageError: string
}


class SurveyEditor extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            snackbar: false,
            surveyInfo: props.surveyInfo,
            isUploading: false,
            imageError: ''
        }
    }

    componentDidUpdate() {
        const validate = this.validateSurvey();
        if (validate) this.props.updateInfo(this.state.surveyInfo);
    }

    onChangeTitle = (event) => {
        this.setState({surveyInfo: { 
            ...this.state.surveyInfo, 
            title: event.target.value 
        }});
    }

    onChangeDescription = (event) => {
        this.setState({ surveyInfo: {
            ...this.state.surveyInfo,
            description: event.target.value 
        }});
    }

    addQuestion = () => {
        const id = uuid();
        const newQuestion: IQuestion = {
            id,
            survey_id: this.state.surveyInfo.id,
            title: '',
            type: 'Multiple choice',
            required: false,
            options: [{
                id: uuid(),
                question_id: id,
                value: ''
            }],
            answers: []
        };

        const questions = this.state.surveyInfo.questions;
        questions.push(newQuestion);
        this.setState({ surveyInfo: { 
            ...this.state.surveyInfo, 
            questions 
        }});
    }

    duplicateQuestion = (question) => {
        const questions = this.state.surveyInfo.questions;
        questions.push({ ...question, id: uuid() });

        this.setState({ surveyInfo: {
            ...this.state.surveyInfo, 
            questions 
        }});
    } 

    deleteQuestion = (index) => {
        let { questions } = this.state.surveyInfo;
        questions.splice(index, 1);

        this.setState({ surveyInfo: {
            ...this.state.surveyInfo, 
            questions 
        }});
    }

    changeType = (event, id) => {
        let result, type = event.target.value;
    
        const questions = this.state.surveyInfo.questions.map(question => {
            if (question.id === id) {
                if (question.type === 'Linear scale') 
                    result = { 
                        ...result, 
                        type,
                        firstLabel: '',
                        secondLabel: '',
                        options: [{
                            id: uuid(),
                            question_id: question.id,
                            value: ''
                        }] 
                    };
                else if (question.type === 'Short Answer') 
                    result = {
                        ...result,
                        type,
                        options: [{
                            id: uuid(),
                            question_id: question.id,
                            value: ''
                        }]
                    };
                if (type === 'Short Answer') result = {
                    type,
                    options: []
                };
                else if (type === 'Linear scale') result = {
                    type,
                    options: [
                        {
                            id: uuid(),
                            question_id: question.id,
                            value: '1'
                        },
                        {
                            id: uuid(),
                            question_id: question.id,
                            value: '2'
                        }
                    ]
                }

                else result = { type };
                return { ...question, ...result }
            };
            return question;
        });

        this.setState({ surveyInfo: {
            ...this.state.surveyInfo,
            questions 
        }});
    }

    changeRequirement = (id) => {
        const questions = this.state.surveyInfo.questions.map(question => {
            if (question.id === id) {
                return { ...question, required: !question.required }
            };
            return question;
        });

        this.setState({ surveyInfo: { 
            ...this.state.surveyInfo, 
            questions 
        }});
    }

    changeQuestionTitle = (event, id) => {
        const questions = this.state.surveyInfo.questions.map(question => {
            if (question.id === id) {
                return { ...question, title: event.target.value }
            };
            return question;
        });

        this.setState({ surveyInfo: {
            ...this.state.surveyInfo, 
            questions 
        }});
    }

    changeQuestion = (newQuestion) => {
        const questions = this.state.surveyInfo.questions.map(question => {
            if (question.id === newQuestion.id) {
                return newQuestion
            };
            return question;
        });

        this.setState({ surveyInfo: { 
            ...this.state.surveyInfo, 
            questions 
        }});
    }

    validateSurvey = () => {
        const { surveyInfo } = this.state;

        if(surveyInfo.questions.length === 0) return false;
        if (surveyInfo.title.trim() === '') return false;
        const error = surveyInfo.questions.some(question => {
            if (question.title.trim() === '') return true;
            if (question.options !== undefined) {
                return question.options.some(option => option.value.trim() === '');
            }
        });

        if (error) return false;
        return true;
    }

    handleUploadFile({ target }, id) {
        this.setState({ isUploading: true, imageError: '' });
    
        if(target.files[0] && target.files[0].size > 1048576*3){
          target.value = "";
          this.setState({ isUploading: false, imageError: 'File is too big! (max 3MB)' });
          return;
        }

        const questions = this.state.surveyInfo.questions.map(question => {
            if (question.id === id) {
                return { ...question, image_link: `https://www.belightsoft.com/products/imagetricks/img/intro-video-poster@2x.jpg` }
            };
            return question;
        });

        this.setState({ 
            surveyInfo: {
                ...this.state.surveyInfo, 
                questions
            },
            isUploading: false
        });
    }

    deleteImg = id => {
        const questions = this.state.surveyInfo.questions.map(question => {
            if (question.id === id) {
                return { ...question, image_link: ''}
            };
            return question;
        });

        this.setState({ 
            surveyInfo: {
                ...this.state.surveyInfo, 
                questions
            }}
        );
    }

    onSave = () => {
        const validate = this.validateSurvey();
        if (!validate) {
            console.log("wrong data");
            return;
        }
        this.setState({ snackbar: true });
        this.props.saveInfo(this.state.surveyInfo);
    }

    render() {
        const { mainPath } = this.props;
        const { title, description, questions } = this.state.surveyInfo;

        return (
            <div>
                {
                    this.validateSurvey() &&
                    <NavLink
                        to={`${mainPath}/preview`}
                    >
                        <div>preview</div>
                    </NavLink>
                }

                {
                    !this.validateSurvey() && 
                    <div>Fill in all required fields to see preview</div>
                }
                
                <form>
                    <p className="required-label">*required</p>
                    <input 
                        type="text" 
                        value={title} 
                        placeholder="Title*" 
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
                                element = (<MultipleChoice 
                                        questionInfo={question} 
                                        changeQuestion={this.changeQuestion}
                                    />);
                            else if (question.type === 'Checkboxes')
                                element = (<MultipleChoice 
                                        questionInfo={question} 
                                        changeQuestion={this.changeQuestion}
                                    />);
                            else if (question.type === 'Linear scale')
                                element = (<LinearScale 
                                        questionInfo={question} 
                                        changeQuestion={this.changeQuestion} 
                                        />);
                            else element = (<ShortAnswer />);

                            return (
                                <div key={i}>
                                <input 
                                        type="text" 
                                        className="question-title"
                                        onChange={(event) => { this.changeQuestionTitle(event, question.id) }} 
                                        value={question.title} 
                                        placeholder="question*" 
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
                                                >
                                                    {type}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    {element}    
                                    {
                                        question.image_link &&
                                        <div> 
                                            <p onClick={() => { this.deleteImg(question.id) }} >
                                                <FontAwesomeIcon icon={faTimesCircle} />
                                            </p>
                                            <img src={question.image_link} alt="" width="300px" />
                                        </div>
                                    }
                                    {
                                        this.state.imageError !== '' &&
                                        <div>{this.state.imageError}</div>
                                    }
                                    <button type="button" onClick={() => {this.duplicateQuestion(question)}}>
                                        Duplicate question
                                    </button>
                                    <button type="button" onClick={() => {this.deleteQuestion(i)}}>
                                        Delete
                                    </button>
                                    <input
                                        name='image'
                                        type='file'
                                        onChange={(ev) => { this.handleUploadFile(ev, question.id) }}
                                        className='upload-image'
                                        id='image'
                                        accept=".jpg, .jpeg, .png"
                                        disabled={this.state.isUploading}
                                    />
                                    <label htmlFor='image' className='upload-image-button'>Upload image</label>
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
                    <button type="button" onClick={this.addQuestion}>Add question</button>
                    {
                        this.validateSurvey() &&
                        <button type="button" onClick={this.onSave}>Save</button>
                    }
                    {
                        !this.validateSurvey() && 
                        <div>
                            <div>Please, fill in all required fields.</div>
                            <button type="button" disabled>Save</button>
                        </div>
                    }    
                    <Snackbar 
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        open={this.state.snackbar}
                        autoHideDuration={4000}
                        onClose={() => { this.setState({ snackbar: false }) }}
                        message="Saved."
                    />
                </form>
            </div>
        )
    }
}

export default SurveyEditor;