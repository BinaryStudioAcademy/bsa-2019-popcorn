import React, { PureComponent } from 'react';
import './Survey.scss';
import SurveyMultipleAnswers from '../SurveyItems/SurveySingleAnswer/SurveySingleAnswer';
import Checkboxes from '../SurveyItems/SurveyMultipleAnswer/SurveyMultipleAnswer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SurveyShortAnswer from '../SurveyItems/SurveyShortAnswer/SurveyShortAnswer';
import SurveyLinearScale from '../SurveyItems/SurveyLinearScale/SurveyLinearScale';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import ReactTimeAgo from 'react-time-ago';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postAnswers } from '../UserSurveys/UserSurveys.redux/actions';
import { transformAnswers } from './Survey.service';
import Spinner from '../../shared/Spinner';
import { NavLink } from 'react-router-dom';

// JavascriptTimeAgo.locale(en);

interface IProps {
	surveyInfo: {
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
		questions: Array<{
			id: string;
			survey_id: string;
			title: string;
			firstLabel?: string;
			lastLabel?: string;
			type: string;
			image_link?: string;
			required: boolean;
			options?: Array<{
				index: number;
				id: string;
				question_id: string;
				value: string;
			}>;
		}>;
	};
	isPreview?: boolean;
	currentUserId: string;
	postAnswers: (any) => any;
}

interface IState {
	answers: Array<{
		questionId: string;
		options: Array<{
			id: string;
		}>;
		value?: string;
	}>;
	isDisabled: boolean;
}

class Survey extends PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			answers: [],
			isDisabled: false
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.surveyInfo) {
			return {
				answers: props.surveyInfo.questions.map(question => ({
					questionId: question.id,
					options: [],
					value: ''
				}))
			};
		}
		return null;
	}

	validate = () => {
		const { questions } = this.props.surveyInfo;
		const { answers } = this.state;
		const requiredQuestions = questions.filter(
			question => question.required === true
		);
		const validate = !requiredQuestions.some(question => {
			const answer: any = answers.find(
				answer => answer.questionId === question.id
			);
			if (question.type !== 'Short Answer') {
				if (answer.options.length === 0) return true;
			} else {
				if (answer.value.trim() === '') return true;
			}
			return false;
		});
		return validate;
	};

	setSingleAnswer = answerInfo => {
		const { questionId, optionId } = answerInfo;
		const newAnswers = this.state.answers.map(answer => {
			if (answer.questionId === questionId) {
				answer.options = [{ id: optionId }];
			}
			return answer;
		});

		this.setState({
			answers: newAnswers
		});
	};

	setShortAnswer = answerInfo => {
		const { questionId, value } = answerInfo;
		const newAnswers = this.state.answers.map(answer => {
			if (answer.questionId === questionId) {
				return { questionId, value, options: [] };
			}
			return answer;
		});
		this.setState({
			answers: newAnswers
		});
	};

	setMultipleAnswer = answerInfo => {
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
	};

	sendAnswer = () => {
		this.setState({ isDisabled: false });
		const validate = this.validate();

		if (!validate) {
			this.setState({ isDisabled: true });
			return;
		}
		const formattedAnswers = transformAnswers(
			this.state.answers,
			this.props.currentUserId
		);
		this.props.postAnswers(formattedAnswers);
	};

	render() {
		if (
			!this.state.answers ||
			!this.props.surveyInfo ||
			!this.props.surveyInfo.questions
		)
			return <Spinner />;

		const { surveyInfo } = this.props;
		const {
			user,
			created_at,
			participants,
			title,
			description,
			questions
		} = surveyInfo;

		return (
			<div className="survey">
				<div className="survey-background" />
				<form>
					<div className="form-header" />
					<div className="info">
						<img src={user.image_link} alt="" />
						<span>{user.name}</span>
						{/* <ReactTimeAgo date={created_at} timeStyle="twitter" locale="ru" /> */}
						<span className="participants">
							{participants} <FontAwesomeIcon icon={faUsers} />
						</span>
					</div>
					<header>
						<h1>{title}</h1>
						<p>{description}</p>
						<p className="required-label">*required</p>
					</header>
					{questions.map((question, i) => {
						if (question.type === 'Multiple choice') {
							return (
								<SurveyMultipleAnswers
									key={i}
									questionInfo={question}
									setAnswer={this.setSingleAnswer}
								/>
							);
						} else if (question.type === 'Checkboxes') {
							return (
								<Checkboxes
									key={i}
									questionInfo={question}
									setAnswer={this.setMultipleAnswer}
								/>
							);
						} else if (question.type === 'Short Answer') {
							return (
								<SurveyShortAnswer
									key={i}
									questionInfo={question}
									setAnswer={this.setShortAnswer}
								/>
							);
						} else
							return (
								<SurveyLinearScale
									key={i}
									questionInfo={question}
									setAnswer={this.setSingleAnswer}
								/>
							);
					})}
					<div className="button">
						{this.state.isDisabled && (
							<div className="error-message">
								Please, answer all required questions.
							</div>
						)}
						{!this.props.isPreview && (
							<NavLink to="/">
								<button type="button" onClick={this.sendAnswer}>
									Send
								</button>
							</NavLink>
						)}
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	surveys: rootState.survey.surveys,
	userId: rootState.profile.selectedProfileInfo
		? rootState.profile.selectedProfileInfo.id
		: null,
	currentUserId: rootState.profile.profileInfo.id
});
const actions = {
	postAnswers
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Survey);
