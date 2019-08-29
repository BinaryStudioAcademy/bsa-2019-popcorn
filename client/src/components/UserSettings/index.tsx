import React from 'react';
import UserSettingsTabs from './UserSettingsTabs';
import UserSettingsTabBody from './UserSettingsTabBody';
import './../UserPage/UserPage.scss';
import './../UserPage/Survey/Survey.scss';
import './UserSettings.scss';

interface IProps {
	mainPath: string;
}

const UserSettings: React.SFC<IProps> = ({ mainPath }) => {
	return (
		<div className={'user'}>
			<UserSettingsTabs mainPath={mainPath} />
			<UserSettingsTabBody mainPath={mainPath} />
		</div>
	);
};

export default UserSettings;
