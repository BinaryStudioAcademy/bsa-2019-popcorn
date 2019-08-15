import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import SurveyEditorNav from '../SurveyEditor/SurveyEditorNav';
import UserSurveys from './UserSurveys';
import newSurvey from './newSurveyConfig';
import { connect } from 'react-redux';
import { fetchSurveys, addSurvey } from './UserSurveys.redux/actions';
import { bindActionCreators } from 'redux';
import { transformDataToProps, transformDataToServerFormat } from './UserSurveys.service';
import { isEqual } from 'lodash';

interface IProps {
	mainPath: string;
	surveys: any;
	fetchSurveys: () => any;
	addSurvey: (any) => any;
}

interface IState {
	surveys: Array<any>
}

const { id, userInfo } = {
	id: '7f13634d-c353-433c-98fe-ead99e1252c7',
	userInfo: {
		name: 'admin',
		image_link: ''
	}
};

class UserSurveysNav extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			surveys: []
		};
	}

	componentDidMount() {
		this.props.fetchSurveys();
		const surveys = transformDataToProps(this.props.surveys);
		this.setState({ surveys });
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !isEqual(this.state, nextState);
	}
	
	updateInfo = newSurvey => {
		console.log('kkyky')
		const survey = this.state.surveys.some(survey => survey.id === newSurvey.id);

		if (!survey) {
			const body = transformDataToServerFormat(newSurvey);
			this.props.addSurvey(body)
		}
		// if (!survey) setState([newSurvey, ...state]);
		else {
			const newState = this.state.surveys.map(survey => {
				if (survey.id === newSurvey.id) return newSurvey;
				return survey;
			});
			// setState([...newState]);
			console.log('need to be update');
		}
	};

	deleteSurvey = deletedSurvey => {
		const index = this.state.surveys.indexOf(deletedSurvey);
		const newState = [...this.state.surveys];
		newState.splice(index, 1);
		// setState(newState);
		console.log('need to be deleted')
	};

	render() {
		console.log('render')
		const { mainPath } = this.props;
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
							mainPath={`${mainPath}/${survey.id}`}
							surveyInfo={survey}
						/>
					)}
				/>
			))}
		</Switch>
	);
	}	
};

const mapStateToProps = (rootState, props) => ({
	...props,
	surveys: rootState.survey.surveys
});

const actions = {
	fetchSurveys,
	addSurvey
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserSurveysNav);
