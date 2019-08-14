import React, { Component } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Snackbar } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import SurveyQuestion from '../SurveyEditorItems/SurveyQuestion';
import SurveyMultipleAnswers from '../SurveyItems/SurveySingleAnswer/SurveySingleAnswer';
import SurveyCheckboxes from '../SurveyItems/SurveyMultipleAnswer/SurveyMultipleAnswer';
import SurveyShortAnswer from '../SurveyItems/SurveyShortAnswer/SurveyShortAnswer';
import SurveyLinearScale from '../SurveyItems/SurveyLinearScale/SurveyLinearScale';
import '../Survey/Survey.scss';

interface IQuestion {
	id: string;
	survey_id: string;
	title: string;
	firstLabel?: string;
	lastLabel?: string;
	type: string;
	image_link?: string;
	required: boolean;
	options?: Array<{
		id: string;
		question_id: string;
		value: string;
	}>;
	answers: Array<{
		id: string;
		question_id: string;
		option_id?: string;
		user_id: string;
		value: string;
	}>;
}

interface ISurvey {
	id: string;
	created_at: Date;
	title: string;
	type: string;
	description: string;
	user_id: string;
	user: {
		name: string;
		image_link: string;
	};
	participants: number;
	questions: Array<IQuestion>;
}

interface IProps {
	mainPath: string;
	surveyInfo: ISurvey;
	updateInfo: (ISurvey) => void;
	saveInfo: (ISurvey) => void;
}

interface IState {
	snackbar: boolean;
	surveyInfo: ISurvey;
	isUploading: boolean;
	currentElement: number;
}

class SurveyEditor extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			snackbar: false,
			surveyInfo: props.surveyInfo,
			isUploading: false,
			currentElement: -1
		};
	}

	validateData = () => {
		let { currentElement, surveyInfo } = this.state;
		let question = surveyInfo.questions[currentElement];

		if (currentElement === -1) {
			if (surveyInfo.title.trim() === '') surveyInfo.title = 'New survey';
		} else surveyInfo = this.validateQuestion(question);

		this.props.updateInfo({ ...this.state.surveyInfo });
	};

	validateQuestion = newQuestion => {
		if (newQuestion.title.trim() === '')
			newQuestion.title = 'Untitled question';
		newQuestion.options = newQuestion.options.map((option, i) => {
			if (option.value.trim() === '')
				return { ...option, value: `Option ${i + 1}` };
			return option;
		});

		const questions = this.state.surveyInfo.questions.map(question => {
			if (question.id === newQuestion.id) return newQuestion;
			return question;
		});

		return { ...this.state.surveyInfo, questions };
	};

	onChangeTitle = event => {
		let title = event.target.value;
		this.setState({
			surveyInfo: {
				...this.state.surveyInfo,
				title
			}
		});
	};

	onChangeDescription = event => {
		this.setState({
			surveyInfo: {
				...this.state.surveyInfo,
				description: event.target.value
			}
		});
	};

	addQuestion = () => {
		const id = uuid();
		const newQuestion: IQuestion = {
			id,
			survey_id: this.state.surveyInfo.id,
			title: 'Untitled question',
			type: 'Multiple choice',
			required: false,
			options: [
				{
					id: uuid(),
					question_id: id,
					value: 'Option 1'
				}
			],
			answers: []
		};

		const questions = this.state.surveyInfo.questions;
		questions.push(newQuestion);
		this.setState({
			surveyInfo: {
				...this.state.surveyInfo,
				questions
			}
		});

		this.changeCurrentElement(questions.length - 1);
	};

	duplicateQuestion = question => {
		const questions = this.state.surveyInfo.questions;
		questions.push({ ...question, id: uuid() });

		this.setState({
			surveyInfo: {
				...this.state.surveyInfo,
				questions
			}
		});

		this.changeCurrentElement(questions.length - 1);
	};

	deleteQuestion = question => {
		let { questions } = this.state.surveyInfo;
		const index = questions.reduce(
			(index, item, i) => (item.id === question.id ? index + i : 0),
			0
		);
		questions.splice(index, 1);

		if (questions.length === 0) {
			const id = uuid();
			questions = [
				{
					id,
					survey_id: this.state.surveyInfo.id,
					title: 'Untitled question',
					type: 'Multiple choice',
					required: false,
					options: [
						{
							id: uuid(),
							question_id: id,
							value: 'Option 1'
						}
					],
					answers: []
				}
			];
		}

		this.setState({
			surveyInfo: {
				...this.state.surveyInfo,
				questions
			},
			currentElement: index - 1
		});
	};

	changeQuestion = newQuestion => {
		const questions = this.state.surveyInfo.questions.map(question => {
			if (question.id === newQuestion.id) {
				return newQuestion;
			}
			return question;
		});

		this.setState({
			surveyInfo: {
				...this.state.surveyInfo,
				questions
			}
		});
	};

	changeCurrentElement = i => {
		let { currentElement, surveyInfo } = this.state;
		let question = surveyInfo.questions[currentElement];

		if (currentElement === -1) {
			if (surveyInfo.title.trim() === '') surveyInfo.title = 'New survey';
		} else {
			if (!question) return;
			surveyInfo = this.validateQuestion(surveyInfo.questions[currentElement]);
		}
		this.setState({ surveyInfo, currentElement: i });
	};

	onSave = () => {
		let { currentElement, surveyInfo } = this.state;
		if (currentElement === -1) {
			if (surveyInfo.title.trim() === '') surveyInfo.title = 'New survey';
		} else
			surveyInfo = this.validateQuestion(surveyInfo.questions[currentElement]);
		this.setState({ snackbar: true, surveyInfo });
		this.props.saveInfo(this.state.surveyInfo);
	};

	render() {
		const { mainPath } = this.props;
		const { title, description, questions } = this.state.surveyInfo;

		return (
			<div className="survey survey-editor-container">
				<NavLink
					className="preview link"
					to={`${mainPath}/preview`}
					onClick={this.validateData}
				>
					<div>
						<FontAwesomeIcon icon={faEye} />
						<span>Preview</span>
					</div>
				</NavLink>
				<div className="survey-background" />
				<form className="survey-editor-form">
					{this.state.currentElement === -1 && (
						<header className="editor-question editor-header">
							<TextareaAutosize
								value={title}
								placeholder="Title*"
								className="survey-title"
								onChange={this.onChangeTitle}
								autoFocus
								maxLength={255}
							/>
							<TextareaAutosize
								onChange={this.onChangeDescription}
								className="survey-description"
								placeholder="Description"
								value={description}
								maxLength={255}
							/>
						</header>
					)}
					{this.state.currentElement !== -1 && (
						<header
							onClick={() => {
								this.changeCurrentElement(-1);
							}}
						>
							<h1>{title}</h1>
							<p>{description}</p>
						</header>
					)}
					{questions.map((question, i) => {
						if (this.state.currentElement === i) {
							return (
								<div key={i} className="editor-question">
									<SurveyQuestion
										questionInfo={question}
										changeQuestion={this.changeQuestion}
										duplicateQuestion={this.duplicateQuestion}
										deleteQuestion={this.deleteQuestion}
									/>
								</div>
							);
						}
						if (question.type === 'Multiple choice')
							return (
								<div
									key={i}
									onClick={() => {
										this.changeCurrentElement(i);
									}}
									className="question-view"
								>
									<SurveyMultipleAnswers questionInfo={question} />
								</div>
							);
						if (question.type === 'Checkboxes')
							return (
								<div
									key={i}
									onClick={() => {
										this.changeCurrentElement(i);
									}}
									className="question-view"
								>
									<SurveyCheckboxes questionInfo={question} />
								</div>
							);
						if (question.type === 'Linear scale')
							return (
								<div
									key={i}
									onClick={() => {
										this.changeCurrentElement(i);
									}}
									className="question-view"
								>
									<SurveyLinearScale questionInfo={question} />
								</div>
							);
						if (question.type === 'Short Answer')
							return (
								<div
									key={i}
									onClick={() => {
										this.changeCurrentElement(i);
									}}
									className="question-view"
								>
									<SurveyShortAnswer questionInfo={question} />
								</div>
							);
					})}
					<div className="buttons">
						<button
							type="button"
							onClick={this.addQuestion}
							className="add-question-bttn"
						>
							Add question
						</button>
						<button
							type="button"
							onClick={this.onSave}
							className="save-question-bttn"
						>
							Save
						</button>
					</div>
					<Snackbar
						anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
						open={this.state.snackbar}
						autoHideDuration={4000}
						onClose={() => {
							this.setState({ snackbar: false });
						}}
						message="Saved."
					/>
				</form>
			</div>
		);
	}
}

export default SurveyEditor;
