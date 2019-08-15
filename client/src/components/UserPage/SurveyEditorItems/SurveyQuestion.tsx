import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { faCopy, faTimes, faTrashAlt, faImage } from '@fortawesome/free-solid-svg-icons';
import MultipleChoice from '../SurveyEditorItems/MultipleChoice';
import ShortAnswer from '../SurveyEditorItems/ShortAnswer';
import LinearScale from '../SurveyEditorItems/LinearScale';
import { isEqual } from 'lodash';
import './SurveyItem.scss';
import { uploadFile } from '../../../services/file.service';
import ImageUploader from '../../MainPage/ImageUploader/ImageUploader';

const QUESTION_TYPES = [
	'Multiple choice',
	'Checkboxes',
	'Short Answer',
	'Linear scale'
];

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
}

interface IProps {
	questionInfo: IQuestion;
	changeQuestion: (IQuestion) => void;
	duplicateQuestion: (IQuestion) => void;
	deleteQuestion: (IQuestion) => void;
}

interface IState {
	questionInfo: IQuestion;
	isUploading: boolean;
	imageError: string;
}

class SurveyQuestion extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			questionInfo: props.questionInfo,
			isUploading: false,
			imageError: ''
		};
	}

	componentWillReceiveProps(nextProps) {
		if (!isEqual(nextProps.questionInfo, this.state.questionInfo)) {
			this.setState({
				questionInfo: { ...nextProps.questionInfo }
			});
		}
	}

	changeType = event => {
		const type = event.target.value;
		let result;
		const question = this.state.questionInfo;

		result = { type };
		if (question.type === 'Linear scale')
			result = {
				...result,
				type,
				firstLabel: '',
				secondLabel: '',
				options: [
					{
						id: uuid(),
						question_id: question.id,
						value: 'Option 1'
					}
				]
			};
		else if (question.type === 'Short Answer')
			result = {
				...result,
				type,
				options: [
					{
						id: uuid(),
						question_id: question.id,
						value: 'Option 1'
					}
				]
			};
		if (type === 'Short Answer')
			result = {
				type,
				options: []
			};
		else if (type === 'Linear scale')
			result = {
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
			};

		this.props.changeQuestion({
			...question,
			...result
		});
	};

	changeRequirement = () => {
		const question = { ...this.state.questionInfo };

		this.props.changeQuestion({
			...question,
			required: !question.required
		});
	};

	changeQuestionTitle = event => {
		const question = { ...this.state.questionInfo };

		this.props.changeQuestion({
			...question,
			title: event.target.value
		});
	};

	deleteImg = () => {
		const question = { ...this.state.questionInfo };

		let newQuestion = {
			...question,
			image_link: ``
		};

		this.props.changeQuestion(newQuestion);
	};

	render() {
		const { questionInfo: question } = this.state;
		const { changeQuestion, duplicateQuestion, deleteQuestion } = this.props;

		return (
			<div>
				<div>
					<div className="type-title">
						<TextareaAutosize
							className="question-title"
							onChange={event => {
								this.changeQuestionTitle(event);
							}}
							value={question.title}
							placeholder="Question*"
							maxLength={255}
							autoFocus
						/>
						{
							<select
								className="question-type"
								value={question.type}
								onChange={event => {
									this.changeType(event);
								}}
							>
								{QUESTION_TYPES.map((type, i) => (
									<option key={i} value={type}>
										{type}
									</option>
								))}
							</select>
						}
					</div>
					{question.type === 'Multiple choice' && (
						<MultipleChoice
							questionInfo={question}
							changeQuestion={changeQuestion}
						/>
					)}
					{question.type === 'Short Answer' && <ShortAnswer />}
					{question.type === 'Checkboxes' && (
						<MultipleChoice
							questionInfo={question}
							changeQuestion={changeQuestion}
						/>
					)}
					{question.type === 'Linear scale' && (
						<LinearScale
							questionInfo={question}
							changeQuestion={changeQuestion}
						/>
					)}
					<label className="question-required">
						<input
							type="checkbox"
							checked={question.required}
							onChange={() => {
								this.changeRequirement();
							}}
						/>
						<span className="checkmark" />
						<span>Required</span>
					</label>
					{question.image_link && (
						<div className="question-image">
							<p
								onClick={() => {
									this.deleteImg();
								}}
							>
								<FontAwesomeIcon icon={faTimes} />
							</p>
							<img src={question.image_link} alt="" />
						</div>
					)}
					{this.state.imageError !== '' && <div>{this.state.imageError}</div>}
					<div className="sidebar-icons">
						<p
							onClick={() => {
								duplicateQuestion(question);
							}}
						>
							<FontAwesomeIcon title="Duplicate question" icon={faCopy} />
						</p>
						<p
							onClick={() => {
								deleteQuestion(question);
							}}
						>
							<FontAwesomeIcon title="Delete question" icon={faTrashAlt} />
						</p>
						<ImageUploader
							imageHandler={uploadFile}
							imageStateHandler={image_link => {
								const question = { ...this.state.questionInfo };

								let newQuestion = {
									...question,
									image_link
								};
								this.props.changeQuestion(newQuestion);
							}}
						/>
						 <label htmlFor="image">
							<p>
								<FontAwesomeIcon icon={faImage} title="Add image" />
							</p>
						</label> 
					</div>
				</div>
			</div>
		);
	}
}

export default SurveyQuestion;
