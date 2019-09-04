import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import SurveyEditorNav from '../SurveyEditor/SurveyEditorNav';
import UserSurveys from './UserSurveys';
import newSurvey from './newSurveyConfig';
import { connect } from 'react-redux';
import {
	fetchUserSurveys,
	fetchSurveys,
	addSurvey,
	updateSurvey,
	deleteSurvey,
	recreateSurvey
} from './UserSurveys.redux/actions';
import { bindActionCreators } from 'redux';
import {
	transformDataToProps,
	transformDataToServerFormatCreate,
	transformDataToServerFormatUpdate
} from './UserSurveys.service';
import { isEqual } from 'lodash';
import Spinner from '../../shared/Spinner';

interface IProps {
	mainPath: string;
	surveys: any;
	fetchUserSurveys: (id: string) => any;
	fetchSurveys: () => any;
	addSurvey: (any) => any;
	updateSurvey: (string, any) => any;
	deleteSurvey: (string) => any;
	recreateSurvey: (string, any) => any;
	userInfo: {
		id: string;
		name: string;
		image_link: string;
	};
	isOwnData: boolean;
}

interface IState {
	surveys: any;
}

class UserSurveysNav extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			surveys: undefined
		};
	}

	componentDidMount() {
		if (window.location.pathname === '/surveys') {
			this.props.fetchSurveys();
		} else if (
			window.location.pathname ===
			`/user-page/${this.props.userInfo.id}/surveys`
		)
			this.props.fetchUserSurveys(this.props.userInfo.id);
	}

	static getDerivedStateFromProps(props, state) {
		let newSurveys = [];
		if (
			window.location.pathname === `/user-page/${props.userInfo.id}/surveys`
		) {
			newSurveys = props.surveys.filter(el => el.user.id === props.userInfo.id);
		} else {
			newSurveys = props.surveys;
		}
		if (!isEqual(newSurveys, state.surveys)) {
			return {
				surveys: transformDataToProps(newSurveys)
			};
		}
		return null;
	}

	updateInfo = newSurvey => {
		const survey = this.state.surveys.find(
			survey => survey.id === newSurvey.id
		);
		if (!survey) {
			const body = transformDataToServerFormatCreate(newSurvey);
			this.props.addSurvey(body);
		} else {
			if (isEqual(survey.questions, newSurvey.questions)) {
				const body = transformDataToServerFormatUpdate(newSurvey);
				this.props.updateSurvey(newSurvey.id, body);
			} else {
				const body = transformDataToServerFormatCreate(newSurvey);
				this.props.recreateSurvey(newSurvey.id, body);
			}
		}
	};

	deleteSurvey = deletedSurvey => {
		this.props.deleteSurvey(deletedSurvey.id);
	};

	render() {
		const { mainPath, userInfo, isOwnData } = this.props;
		if (!this.state.surveys) return <Spinner />;
		return (
			<Switch>
				<Route
					exact
					path={mainPath}
					render={routeProps => (
						<UserSurveys
							{...routeProps}
							updateInfo={this.updateInfo}
							surveys={this.state.surveys}
							mainPath={mainPath}
							deleteSurvey={this.deleteSurvey}
							isOwnData={isOwnData}
						/>
					)}
				/>
				<Route
					path={`${mainPath}/create`}
					render={() => (
						<SurveyEditorNav
							mainPath={`${mainPath}/create`}
							redirPath={mainPath}
							surveyInfo={{
								...newSurvey(),
								user_id: userInfo.id,
								user: { ...userInfo }
							}}
							updateInfo={this.updateInfo}
						/>
					)}
				/>
				{this.state.surveys.map((survey, i) => (
					<Route
						key={i}
						path={`${mainPath}/${survey.id}`}
						render={() => (
							<SurveyEditorNav
								updateInfo={this.updateInfo}
								redirPath={mainPath}
								mainPath={`${mainPath}/${survey.id}`}
								surveyInfo={survey}
							/>
						)}
					/>
				))}
			</Switch>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	surveys: rootState.survey.surveys,
	userId: rootState.profile.selectedProfileInfo
		? rootState.profile.selectedProfileInfo.id
		: null
});

const actions = {
	fetchUserSurveys,
	fetchSurveys,
	addSurvey,
	updateSurvey,
	deleteSurvey,
	recreateSurvey
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserSurveysNav);
