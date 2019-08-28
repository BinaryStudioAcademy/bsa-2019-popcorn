import React from 'react';
import UserInterface from './../UserSettingsInterface';
import './../../UserPage/SurveyItems/SurveyMultipleAnswer/SurveyMultipleAnswer.scss';
import Spinner from '../../shared/Spinner';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateNotficationSettings } from './../actions';
interface IProps {
	profileInfo: UserInterface;
	updateNotficationSettings: (userId: string, data: object) => void;
	loading: boolean;
}

interface IState {
	user: UserInterface;
}

const emailPreferences = [
	{
		key: 'emailNotificationNews',
		value: 'News'
	},
	{
		key: 'emailNotificationUpdatesFromFollowed',
		value: 'Updates from followed'
	},
	{
		key: 'emailNotificationComments',
		value: 'Comments'
	},
	{
		key: 'emailNotificationEvents',
		value: 'Events'
	}
];

const sitePreferences = [
	{
		key: 'siteNotificationUpdatesFromFollowed',
		value: 'Updates from followed'
	},
	{
		key: 'siteNotificationComments',
		value: 'Comments'
	},
	{
		key: 'siteNotificationEvents',
		value: 'Events'
	}
];

class NotificationPreferences extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		const { profileInfo } = this.props;
		this.state = { user: profileInfo };
	}
	createControlBLock(key, value) {
		const { user } = this.state;
		return (
			<p key={key}>
				<label>
					<input
						type="checkbox"
						name={key}
						key={key}
						value={value}
						checked={user[key]}
						onChange={event => {
							const { user } = this.state;
							user[key] = event.target.checked;
							this.setState({ user });
						}}
					/>
					<span className="checkmark"></span>
					{value}
				</label>
			</p>
		);
	}

	saveUpdatedSettings(event) {
		event.preventDefault();
		const { id: userId } = this.props.profileInfo;
		const { updateNotficationSettings } = this.props;
		const { user } = this.state;
		updateNotficationSettings(userId, user);
	}

	render() {
		const { loading } = this.props;
		return loading ? (
			<Spinner />
		) : (
			<div className={'survey settings'}>
				<form className={'settings-form'}>
					<div className={'question-container multiple settings-container'}>
						<h3 className="survey-question settings-title">
							Email Notifications
						</h3>
						<p className="settings-current-info-wrapper">Notify me about</p>
						{emailPreferences.map(({ key, value }) =>
							this.createControlBLock(key, value)
						)}
					</div>
					<div className={'question-container multiple settings-container'}>
						<h3 className={'survey-question settings-title'}>
							Site notifications
						</h3>
						<p className="settings-current-info-wrapper">Notify me about</p>
						{sitePreferences.map(({ key, value }) =>
							this.createControlBLock(key, value)
						)}
					</div>
					<div className="content-centered">
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
	updateNotficationSettings
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NotificationPreferences);
