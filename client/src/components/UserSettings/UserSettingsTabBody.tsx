import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
	updateEmail,
	updatePassword,
	updateNotficationSettings,
	updatePrivacySettings,
	deleteUser
} from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AccountPreferences from './AccountPreferences';
import NotificationPreferences from './NotificationPreferences';
import PrivacyPreferences from './PrivacySettings';
import UserInterface from './UserSettingsInterface';
interface IProps {
	mainPath: string;
	profileInfo: UserInterface;
	updateEmail: (userId: string, email: string) => void;
	updatePassword: (userId: string, password: string) => void;
	updateNotficationSettings: (userId: string, data: object) => void;
	updatePrivacySettings: (userId: string, data: object) => void;
	deleteUser: (userId: string) => void;
}

const UserSettingsPageTabBody: React.SFC<IProps> = ({
	mainPath,
	profileInfo,
	updateEmail,
	updatePassword,
	deleteUser,
	updateNotficationSettings
}) => {
	return (
		<div className={'user-tab-body'}>
			<Switch>
				<Route
					exact
					path={`${mainPath}/`}
					render={() => (
						<AccountPreferences
							profileInfo={profileInfo}
							updateEmail={updateEmail}
							updatePassword={updatePassword}
							deleteUser={deleteUser}
						/>
					)}
				/>
				<Route
					exact
					path={`${mainPath}/notification`}
					component={NotificationPreferences}
				/>
				<Route
					exact
					path={`${mainPath}/privacy`}
					component={PrivacyPreferences}
				/>
			</Switch>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	profileInfo: rootState.profile.profileInfo
});

const actions = {
	updateEmail,
	updatePassword,
	updateNotficationSettings,
	updatePrivacySettings,
	deleteUser
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserSettingsPageTabBody);
