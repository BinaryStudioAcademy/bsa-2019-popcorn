import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import SurveyEditorNav from '../SurveyEditor/SurveyEditorNav';
import UserSurveys from './UserSurveys';
import newSurvey from './newSurveyConfig';
import { connect } from 'react-redux';
import { fetchSurveys } from './UserSurveys.redux/actions';
import { bindActionCreators } from 'redux';
import { transformDataToProps } from './UserSurveys.service';

interface IProps {
	mainPath: string;
	surveys: any;
	fetchSurveys: () => any;
}

const { id, userInfo } = {
	id: '1',
	userInfo: {
		name: 'Parsons',
		image_link: 'https://i.pravatar.cc/300?img=5'
	}
};

const UserSurveysNav: React.FC<IProps> = (props: IProps) => {
	const { mainPath } = props;

	useEffect(() => {
		props.fetchSurveys();
	}, []);
	
	const surveys = transformDataToProps(props.surveys);
	console.log(surveys);

	const updateInfo = newSurvey => {
		const survey = surveys.some(survey => survey.id === newSurvey.id);

		if (!survey) console.log('need to be created');
		// if (!survey) setState([newSurvey, ...state]);
		else {
			const newState = surveys.map(survey => {
				if (survey.id === newSurvey.id) return newSurvey;
				return survey;
			});
			// setState([...newState]);
			console.log('need to be update');
		}
	};

	const deleteSurvey = deletedSurvey => {
		const index = surveys.indexOf(deletedSurvey);
		const newState = [...surveys];
		newState.splice(index, 1);
		// setState(newState);
		console.log('need to be deleted')
	};

	return (
		<Switch>
			<Route
				exact
				path={mainPath}
				render={routeProps => (
					<UserSurveys
						{...routeProps}
						updateInfo={updateInfo}
						surveys={props.surveys}
						mainPath={mainPath}
						deleteSurvey={deleteSurvey}
					/>
				)}
			/>
			<Route
				path={`${mainPath}/create`}
				render={() => (
					<SurveyEditorNav
						mainPath={`${mainPath}/create`}
						surveyInfo={{
							...newSurvey(),
							user_id: id,
							user: { ...userInfo }
						}}
						updateInfo={updateInfo}
					/>
				)}
			/>
			{surveys.map((survey, i) => (
				<Route
					key={i}
					path={`${mainPath}/${survey.id}`}
					render={() => (
						<SurveyEditorNav
							updateInfo={updateInfo}
							mainPath={`${mainPath}/${survey.id}`}
							surveyInfo={survey}
						/>
					)}
				/>
			))}
		</Switch>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	surveys: rootState.survey.surveys
});

const actions = {
	fetchSurveys
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserSurveysNav);
