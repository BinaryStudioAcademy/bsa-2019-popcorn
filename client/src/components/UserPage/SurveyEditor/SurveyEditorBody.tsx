import React from 'react';
import SurveyEditor from './SurveyEditor';
import { NavLink, Route, Switch, Link } from 'react-router-dom';
import SurveyReplies from '../SurveyReplies/SurveyReplies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import SurveyStatistics from '../SurveyStatistics/SurveyStatistics';
import SurveyIndividual from '../SurveyIndividual/SurveyIndividual';
interface ISurvey {
	id: string;
	created_at: Date;
	title: string;
	type: string;
	description: string;
	user_id: string;
	image: string;
	user: {
		name: string;
		image_link: string;
	};
	participants: number;
	questions: Array<{
		index: number;
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
	updateInfo: (ISurvey) => void;
	saveInfo?: (ISurvey) => void;
	mainPath: string;
	surveyInfo: ISurvey;
	redirPath: string;
}

const SurveyEditorBody: React.FC<IProps> = (props: IProps) => {
	const { mainPath, surveyInfo, updateInfo, redirPath } = props;

	return (
		<div>
			<header className="nav-header">
				<NavLink to={redirPath} className="user-tab">
					<FontAwesomeIcon icon={faArrowLeft} />
				</NavLink>
				<NavLink
					to={`${mainPath}/questions`}
					activeClassName="user-tab-active"
				>
					Questions
				</NavLink>
				<NavLink
					to={`${mainPath}/responses/`}
					activeClassName="user-tab-active"
				>
					View responses
					<FontAwesomeIcon icon={faChevronDown} />
				</NavLink>
				<div className="menu-modal">
				<NavLink
					to={`${mainPath}/responses/statistics`}
					className="user-tab"
					activeClassName="user-tab-active"
				>
					Statistics
				</NavLink>
				<NavLink
					to={`${mainPath}/responses/individual`}
					className="user-tab"
					activeClassName="user-tab-active"
				>
					Individual
				</NavLink>
					</div>
			</header>
			<Switch>
				<Route
					exact
					path={`${mainPath}/questions`}
					render={() => {
						return (
							<div>
								{props.saveInfo !== undefined && (
									<SurveyEditor
										updateInfo={updateInfo}
										mainPath={mainPath}
										redirPath={redirPath}
										surveyInfo={surveyInfo}
										saveInfo={props.saveInfo}
									/>
								)}
							</div>
						);
					}}
				/>
				<Route
					path={`${mainPath}/responses/individual`}
					render={() => <SurveyIndividual surveyInfo={surveyInfo} />}
				/>
				<Route
					path={`${mainPath}/responses/`}
					render={() => <SurveyStatistics questions={surveyInfo.questions} />}
				/>
				<Route
					exact
					path={`${mainPath}/responses/statistics`}
					render={() => <SurveyStatistics questions={surveyInfo.questions} />}
				/>

			</Switch>
		</div>
	);
};

export default SurveyEditorBody;
