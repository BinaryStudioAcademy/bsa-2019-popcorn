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
	type: 'all' | 'specific';
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
		if (this.props.type == 'all') this.props.fetchSurveys();
		else if (this.props.type === 'specific')
			this.props.fetchUserSurveys(this.props.userInfo.id);
	}

	static getDerivedStateFromProps(props, state) {
		if (!isEqual(props.surveys, state.surveys)) {
			return {
				surveys: transformDataToProps(props.surveys)
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
		const { mainPath, userInfo, type } = this.props;
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
							type={type}
							deleteSurvey={this.deleteSurvey}
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
