import React from 'react';
import UserPageTabs from './UserPageTabs';
import UserPageTabBody from './UserPageTabBody';
import './UserPage.scss';
import { getSelectedUserInfo } from './actions';
import {
	fetchFollowersCount,
	fetchFollowingsCount,
	checkStatus
} from './ProfileComponent/FollowSystem/FollowSystem.redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../shared/Spinner';
import { Redirect } from 'react-router';

interface IProps {
	match: {
		path: string;
		params: any;
	};
	currentUserId: string;
	getSelectedUserInfo: (id: string) => any;
	fetchFollowersCount: (userId: string) => any;
	fetchFollowingsCount: (userId: string) => any;
	checkStatus: (userId: string, followerId: string) => any;
	selectedProfileInfo: any;
}

const User: React.SFC<IProps> = ({
	match,
	currentUserId,
	getSelectedUserInfo,
	selectedProfileInfo,
	fetchFollowersCount,
	fetchFollowingsCount,
	checkStatus
}) => {
	if (match.params.id) {
		if (
			(selectedProfileInfo && match.params.id !== selectedProfileInfo.id) ||
			selectedProfileInfo === null
		) {
			fetchFollowersCount(match.params.id);
			fetchFollowingsCount(match.params.id);
			checkStatus(currentUserId, match.params.id);
			getSelectedUserInfo(match.params.id);
			return <Spinner />;
		}
	}
	const mainPath = `/user-page/${match.params.id}`;

	return selectedProfileInfo ? (
		<div className={'user'}>
			<UserPageTabs mainPath={mainPath} />
			<UserPageTabBody mainPath={mainPath} />
		</div>
	) : (
		<Redirect to={'/'} />
	);
};

const mapStateToProps = (rootState, props) => ({
	selectedProfileInfo: rootState.profile.selectedProfileInfo,
	currentUserId: rootState.profile.profileInfo.id
});

const actions = {
	getSelectedUserInfo,
	fetchFollowersCount,
	fetchFollowingsCount,
	checkStatus
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User);
