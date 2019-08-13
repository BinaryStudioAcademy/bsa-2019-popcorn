import React from 'react';
import UserPageTabs from './UserPageTabs';
import UserPageTabBody from './UserPageTabBody';
import './UserPage.scss';

interface IProps {
	match: {
		path: string;
	};
}

const User: React.SFC<IProps> = ({ match }) => {
	const { path: mainPath } = match;

	return (
		<div className={'user'}>
			<UserPageTabs mainPath={mainPath} />
			<UserPageTabBody mainPath={mainPath} />
		</div>
	);
};

export default User;
