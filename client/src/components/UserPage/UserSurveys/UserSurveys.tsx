import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { isEqual } from 'lodash';
import { NavLink } from 'react-router-dom';
import './UserSurveys.scss';
import { connect } from 'react-redux';

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
		answers: Array<{
			id: string;
			question_id: string;
			option_id?: string;
			user_id: string;
			value: string;
		}>;
	}>;
}

interface IProps {
	mainPath: string;
	updateInfo: (ISurvey) => void;
	deleteSurvey: (ISurvey) => void;
	surveys: Array<ISurvey>;
	userId: string;
	userRole: string;
	location?: {
		state?: {
			url_callback?: string;
		};
	};
	history?: {
		push: (path: string) => any;
	};
	selectedProfileId: string;
}

interface IState {
	deletedSurvey: number;
	surveys: Array<ISurvey>;
}

class UserSurveys extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			surveys: props.surveys,
			deletedSurvey: -1
		};
	}

	/* 	componentWillReceiveProps(nextProps) {
		if (!isEqual(nextProps.surveys, this.state.surveys)) {
			this.setState({ surveys: nextProps.surveys });
		}
	} */

	static getDerivedStateFromProps(props, state) {
		if (!isEqual(props.surveys, state.surveys)) {
			return {
				surveys: props.surveys
			};
		}
		return null;
	}

	showModal = (event, id) => {
		event.preventDefault();
		this.setState({ deletedSurvey: id });
	};

	deleteSurvey = () => {
		const { surveys, deletedSurvey } = this.state;
		this.props.deleteSurvey(surveys[deletedSurvey]);
		this.setState({ deletedSurvey: -1 });
	};

	typeSurveyBttn = survey => {
		if (survey.type === 'Close')
			return (
				<button
					onClick={event => {
						this.openSurvey(event, survey.id);
					}}
					type="button"
				>
					Open survey
				</button>
			);
		return (
			<button
				onClick={event => {
					this.closeSurvey(event, survey.id);
				}}
				type="button"
			>
				Close survey
			</button>
		);
	};

	openSurvey = (event, id) => {
		event.preventDefault();
		this.state.surveys.forEach(survey => {
			if (survey.id === id) {
				this.props.updateInfo({ ...survey, type: 'Open' });
			}
		});
	};

	closeSurvey = (event, id) => {
		event.preventDefault();
		this.state.surveys.forEach(survey => {
			if (survey.id === id) {
				this.props.updateInfo({ ...survey, type: 'Close' });
			}
		});
	};

	modalIsShown = () => {
		const { deletedSurvey, surveys } = this.state;
		if (deletedSurvey === -1) return null;
		return (
			<div className="modal-delete-container">
				<div className="modal-delete">
					<p>Are you sure you want to delete this survey?</p>
					<p className="delete-title">{surveys[deletedSurvey].title}</p>
					<button className="delete" onClick={this.deleteSurvey}>
						Delete
					</button>
					<button
						onClick={() => {
							this.setState({ deletedSurvey: -1 });
						}}
					>
						Cancel
					</button>
				</div>
			</div>
		);
	};

	isOwnSurvey(survey) {
		const { userId, userRole } = this.props;
		const { user_id } = survey;
		return userRole === 'admin' || userId === user_id;
	}

	render() {
		const { surveys } = this.state;
		const { mainPath } = this.props;

		const url_callback =
			this.props.location &&
			this.props.location.state &&
			this.props.location.state.url_callback;
		const redirect = () =>
			url_callback
				? this.props.history && this.props.history.push(url_callback)
				: null;

		return (
			<div>
				{url_callback && (
					<button onClick={redirect} className={'btn'}>
						Back to story
					</button>
				)}
				<div className="userSurveys">
					{this.props.selectedProfileId === this.props.userId ||
					window.location.pathname === '/surveys-list/' ? (
						<NavLink to={`${mainPath}/create`} className="create-button">
							<button>Create survey</button>
						</NavLink>
					) : null}
					<div className="survey-list">
						{surveys.map((survey, i) => {
							// add "if (this.isOwnSurvey(survey))" check when it will survey list with surveys of all users
							return (
								<NavLink key={i} exact={!i} to={`${mainPath}/${survey.id}`}>
									<div className="survey-list-item">
										<span>{survey.title}</span>
										{this.isOwnSurvey(survey) ? (
											<p className="buttons">
												{this.typeSurveyBttn(survey)}
												<button
													className="delete-bttn"
													onClick={event => {
														this.showModal(event, i);
													}}
												>
													<FontAwesomeIcon icon={faTrashAlt} />
												</button>
											</p>
										) : null}
									</div>
								</NavLink>
							);
						})}
					</div>
					{this.modalIsShown()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id,
	userRole: rootState.profile.profileInfo.role,
	selectedProfileId: rootState.profile.selectedProfileInfo
		? rootState.profile.selectedProfileInfo.id
		: null
});

export default connect(mapStateToProps)(UserSurveys);
