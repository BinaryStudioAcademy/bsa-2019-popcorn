import React from 'react';
import UserInterface from './../UserSettingsInterface';
import './../../UserPage/SurveyItems/SurveyMultipleAnswer/SurveyMultipleAnswer.scss';
import { updatePrivacySettings } from './../actions';
import Spinner from '../../shared/Spinner';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface IProps {
	profileInfo: UserInterface;
	updatePrivacySettings: (userId: string, data: object) => void;
	loading: boolean;
}

interface IState {
	user: UserInterface;
}

const privacyPreverences = [
	{
		key: 'privacyProfileInfo',
		value: 'Who can see my profile info ?'
	},
	{
		key: 'privacyMyPosts',
		value: 'Who can see my posts ?'
	},
	{
		key: 'privacyStories',
		value: 'Who can see my stories ?'
	},
	{
		key: 'privacyEvents',
		value: 'Who can see my events ?'
	},
	{
		key: 'privacySurveys',
		value: 'Who can see my surveys ?'
	},
	{
		key: 'privacyTops',
		value: 'Who can see my tops ?'
	},
	{
		key: 'privacyCollections',
		value: 'Who can see my collections ?'
	},
	{
		key: 'privacyWatchlist',
		value: 'Who can see my watch list ?'
	},
	{
		key: 'privacyReviews',
		value: 'Who can see my reviews ?'
	},
	{
		key: 'privacyMessages',
		value: 'Who can see my messages ?'
	}
];

const types = ['All', 'Followers', 'OnlyMe'];

class PrivacyPreferences extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		const { profileInfo } = this.props;
		this.state = { user: profileInfo };
	}

	createControlBLock(key, value, userProfile) {
		return (
			<p key={key}>
				<label className="privacy-setting-wrapper">
					{value}
					<select
						className="type-select"
						value={userProfile[key]}
						onChange={event => {
							const { user } = this.state;
							user[key] = event.target.value;
							this.setState({ user });
						}}
					>
						{types.map(type => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</label>
			</p>
		);
	}

	saveUpdatedSettings(event) {
		event.preventDefault();
		const { id: userId } = this.props.profileInfo;
		const { updatePrivacySettings } = this.props;
		const { user } = this.state;
		updatePrivacySettings(userId, user);
	}

	render() {
		const { loading } = this.props;
		return loading ? (
			<Spinner />
		) : (
			<div className={'survey settings'}>
				<form className={'settings-form'}>
					<div className={'question-container settings-container'}>
						<h3 className="survey-question settings-title">Privacy settings</h3>
						<p className="settings-current-info-wrapper">
							Your privacy settings determines which information is visible to
							other users.
						</p>
						{privacyPreverences.map(({ key, value }) =>
							this.createControlBLock(key, value, this.props.profileInfo)
						)}
						<button
							className="settings-btn"
							onClick={event => this.saveUpdatedSettings(event)}
						>
							Save
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	profileInfo: rootState.profile.profileInfo,
	loading: rootState.profile.loading
});
const actions = {
	updatePrivacySettings
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PrivacyPreferences);
