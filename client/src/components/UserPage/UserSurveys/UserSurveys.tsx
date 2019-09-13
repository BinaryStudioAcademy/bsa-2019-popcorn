import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { isEqual } from 'lodash';
import { NavLink } from 'react-router-dom';
import Image from '../../shared/Image/Image';
import CreateExtraBtn from '../../shared/CreateExtraBtn';
import './UserSurveys.scss';
import Spinner from '../../shared/Spinner';
import config from '../../../config';
import Moment from 'react-moment';

interface ISurvey {
	id: string;
	created_at: Date;
	title: string;
	type: string;
	description: string;
	image: string;
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
	isOwnData: boolean;
	location?: {
		state?: {
			url_callback?: string;
		};
	};
	history?: {
		push: (path: string) => any;
	};
	loading: boolean;
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

	render() {
		const { surveys } = this.state;
		const { mainPath, isOwnData } = this.props;

		const url_callback =
			this.props.location &&
			this.props.location.state &&
			this.props.location.state.url_callback;
		const redirect = () =>
			url_callback
				? this.props.history && this.props.history.push(url_callback)
				: null;
		if (this.props.loading) {
			return <Spinner />;
		}
		return (
			<div>
				{url_callback && (
					<button onClick={redirect} className={'btn'}>
						Back to story
					</button>
				)}
				<div
					className={`userSurveys ${
						window.location.pathname === '/surveys' ? 'all-surveys' : ''
					}`}
				>
					{isOwnData || window.location.pathname === '/surveys' ? (
						<NavLink to={`${mainPath}/create`}>
							<CreateExtraBtn handleClick={() => {}} body={'Create survey'} />
						</NavLink>
					) : null}
					<div className="survey-list">
						{surveys.map((survey, i) => {
							// add "if (isOwnData)" check when it will survey list with surveys of all users
							return (
								<NavLink
									key={i}
									exact={!i}
									to={
										isOwnData
											? `${mainPath}/${survey.id}`
											: `/survey-page/${survey.id}`
									}
								>
									<div className="survey-list-item">
										<div className="survey-image-wrp">
											<Image
												src={survey.image}
												defaultSrc={config.DEFAULT_SURVEY_IMAGE}
												alt="survey-image"
											/>
										</div>
										<div className="survey-item-right">
											<div className="survey-info">
												<div className="survey-info-title">{survey.title}</div>
												<div className="survey-info-description">
													{survey.description}
												</div>
												<div className="survey-participants">
													<FontAwesomeIcon
														className="icon-users-survey"
														icon={faUsers}
													/>
													{survey.participants} users participate
												</div>
											</div>
											<div className="survey-secondary-info">
												{isOwnData ? (
													<Moment
														className="creation-date"
														format=" D MMMM HH:mm "
														local
													>
														{String(survey.created_at)}
													</Moment>
												) : (
													<div className="date-and-author">
														<div className="creator-info">
															<img
																className="creator-avatar"
																src={
																	survey.user.image_link
																		? survey.user.image_link
																		: config.DEFAULT_AVATAR
																}
															/>
															<div className="author-date">
																<span className="creator-name">
																	{survey.user.name}
																</span>
																<Moment
																	className="creation-date"
																	format=" D MMMM HH:mm "
																	local
																>
																	{String(survey.created_at)}
																</Moment>
															</div>
														</div>
													</div>
												)}
											</div>
										</div>
										{isOwnData ? (
											<p className="buttons">
												<button
													onClick={event => {
														this.showModal(event, i);
													}}
												>
													Delete
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
				{surveys.length === 0 ? (
					<div className="no-info-yet">No surveys yet</div>
				) : null}
			</div>
		);
	}
}

export default UserSurveys;
