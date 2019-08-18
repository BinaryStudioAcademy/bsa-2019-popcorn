import React, { PureComponent } from 'react';
import SurveySingleAnswer from '../SurveyItems/SurveySingleAnswer/SurveySingleAnswer';
import SurveyMultipleAnswer from '../SurveyItems/SurveyMultipleAnswer/SurveyMultipleAnswer';
import SurveyShortAnswer from '../SurveyItems/SurveyShortAnswer/SurveyShortAnswer';
import SurveyLinearScale from '../SurveyItems/SurveyLinearScale/SurveyLinearScale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleLeft,
	faArrowCircleRight
} from '@fortawesome/free-solid-svg-icons';
import './../Survey/Survey.scss';
import './SurveyIndividual.scss';

interface IOption {
	index: number;
	id: string;
	question_id: string;
	value: string;
}

interface IAnswer {
	id: string;
	question_id: string;
	option_id?: string;
	user_id: string;
	value: string;
}

interface IQuesstion {
	id: string;
	survey_id: string;
	title: string;
	firstLabel?: string;
	lastLabel?: string;
	type: string;
	image_link?: string;
	required: boolean;
	options?: Array<IOption>;
	answers: Array<IAnswer>;
}

interface IProps {
	surveyInfo: {
		participants: number;
		questions: Array<IQuesstion>;
	};
}

interface IState {
	currUserIndex: number;
	usersIdList: string[];
}

class SurveyIndividual extends PureComponent<IProps, IState> {
	constructor(props) {
		super(props);
		const {
			surveyInfo: { questions }
		} = this.props;
		const usersIdList = this.getUserIdList(questions);
		this.state = {
			currUserIndex: 0,
			usersIdList: usersIdList
		};
	}

	moveToNextUser() {
		const { currUserIndex, usersIdList } = this.state;
		const newIndex =
			currUserIndex + 1 === usersIdList.length ? 0 : currUserIndex + 1;
		this.setState({
			currUserIndex: newIndex
		});
	}
	moveToPrevUser() {
		const { currUserIndex, usersIdList } = this.state;
		const newIndex = currUserIndex ? currUserIndex - 1 : usersIdList.length - 1;
		this.setState({
			currUserIndex: newIndex
		});
	}
	getUserIdList(questions: IQuesstion[]): string[] {
		const all: string[] = [];
		questions.forEach(({ answers }) => {
			answers.forEach(({ user_id }) => all.push(user_id));
		});
		const res = new Set(all);
		return [...res];
	}

	getCurrUserAnswer(currQuestionId, currUserId, answers: IAnswer[]) {
		const res = answers.filter(({ question_id, user_id }) =>
			currQuestionId === question_id && currUserId === user_id ? true : false
		);
		return res;
	}

	checkForAnswers(questions: IQuesstion[]) {
		let haveAnswers = true;
		questions.forEach(({ answers }) => {
			if (!answers.length) haveAnswers = false;
		});
		return haveAnswers;
	}

	render() {
		const {
			surveyInfo: { questions }
		} = this.props;
		const { currUserIndex, usersIdList } = this.state;
		return (
			<div className="survey">
				<div className="survey-background" />
				{this.checkForAnswers(questions) ? (
					<form>
						<div className="form-header" />
						<p className="page-control-wrapper">
							<span
								onClick={() => this.moveToPrevUser()}
								className="page-control page-control--left"
							>
								<FontAwesomeIcon icon={faArrowCircleLeft} />
							</span>
							{currUserIndex + 1} of {usersIdList.length}
							<span
								onClick={() => this.moveToNextUser()}
								className="page-control page-control--right"
							>
								<FontAwesomeIcon icon={faArrowCircleRight} />
							</span>
						</p>
						{questions.map((question, i) => {
							if (question.type === 'Multiple choice') {
								return (
									<SurveySingleAnswer
										key={i}
										questionInfo={question}
										setAnswer={() => {}}
										disable={true}
										answer={
											this.getCurrUserAnswer(
												question.id,
												usersIdList[currUserIndex],
												question.answers
											)[0]
										}
									/>
								);
							} else if (question.type === 'Checkboxes') {
								return (
									<SurveyMultipleAnswer
										key={i}
										questionInfo={question}
										setAnswer={() => {}}
										disable={true}
										answers={this.getCurrUserAnswer(
											question.id,
											usersIdList[currUserIndex],
											question.answers
										)}
									/>
								);
							} else if (question.type === 'Short Answer') {
								return (
									<SurveyShortAnswer
										key={i}
										questionInfo={question}
										disable={true}
										answer={
											this.getCurrUserAnswer(
												question.id,
												usersIdList[currUserIndex],
												question.answers
											)[0]
										}
									/>
								);
							} else
								return (
									<SurveyLinearScale
										key={i}
										questionInfo={question}
										disable={true}
										answer={
											this.getCurrUserAnswer(
												question.id,
												usersIdList[currUserIndex],
												question.answers
											)[0]
										}
									/>
								);
						})}
					</form>
				) : (
					<form>
						<div className="form-header" />
						<h3 className="errorResponses-individual">
							This survey doesnt have any responses
						</h3>
					</form>
				)}
			</div>
		);
	}
}

export default SurveyIndividual;
