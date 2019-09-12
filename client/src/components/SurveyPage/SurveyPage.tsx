import React from 'react';
import Survey from '../UserPage/Survey/Survey';
import { connect } from 'react-redux';
import * as actions from '../UserPage/UserSurveys/UserSurveys.redux/actions';
import Spinner from '../shared/Spinner';

interface ISurveyPageProps {
	match: any;
	survey: any;
	loading: boolean;
	profileInfo: any;
	getSurveyById: (data?: any) => any;
}

class SurveyPage extends React.Component<ISurveyPageProps> {
	componentDidMount() {
		this.props.getSurveyById(this.props.match.params.id);
	}

	render() {
		const { loading = true, survey } = this.props;
		
		return (
			<>
				{loading ? (
					<Spinner />
				) : (
					<div>
						<Survey
							surveyInfo={survey}
							isPreview={false}
						/>
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = rootState => ({
	survey: rootState.survey.survey,
	loading: rootState.survey.loading,
	profileInfo: rootState.profile.profileInfo
});

const mapDispatchToProps = {
	...actions
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SurveyPage);
