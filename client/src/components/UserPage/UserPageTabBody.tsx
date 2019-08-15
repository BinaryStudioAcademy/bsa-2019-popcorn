import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserPosts from './UserPosts/UserPosts';
import UserReviews from './UserReviews/UserReviews';
import UserEvents from './UserEvents/UserEvents';
import UserSurveys from './UserSurveys/UserSurveys';
import UserTops from './UserTops/UserTops';
import UserLists from './UserLists/UserLists';
import UserWatched from './UserWatched/UserWatched';
import ProfileComponent from './ProfileComponent/ProfileComponent';
import UserSurveysNav from './UserSurveys/UserSurveysNav';
import mock from './Survey/mock';
import {
	cancelAvatar,
	getUsersPosts,
	setAvatar,
	uploadAvatar
} from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const surveys = mock;

interface IProps {
	mainPath: string;
	uploadAvatar: (FormData, string) => any;
	profileInfo: {
		id: string;
		name: string;
		male: boolean;
		female: boolean;
		location: string;
		about: string;
		avatar: string;
	};
	uploadUrl?: string;
	cancelAvatar: () => any;
	setAvatar: (url: string, id: string) => any;
	userPosts?: any; //todo
	getUsersPosts: (id: string) => any;
}

const UserPageTabs: React.SFC<IProps> = ({
	mainPath,
	uploadAvatar,
	profileInfo,
	uploadUrl,
	cancelAvatar,
	setAvatar,
	userPosts,
	getUsersPosts
}) => {
	console.log(profileInfo);
	return (
		<div className={'user-tab-body'}>
			<Switch>
				<Route
					exact
					path={`${mainPath}`}
					render={() => (
						<ProfileComponent
							uploadAvatar={uploadAvatar}
							profileInfo={profileInfo}
							uploadUrl={uploadUrl}
							cancelAvatar={cancelAvatar}
							setAvatar={setAvatar}
						/>
					)}
				/>
				<Route
					path={`${mainPath}/posts`}
					component={() => (
						<UserPosts
							posts={userPosts}
							getUsersPosts={() => getUsersPosts(profileInfo.id)}
						/>
					)}
				/>
				<Route path={`${mainPath}/reviews`} component={UserReviews} />
				<Route path={`${mainPath}/events`} component={UserEvents} />
				<Route
					path={`${mainPath}/surveys`}
					render={props => (
						<UserSurveysNav
							userInfo={{
								id: profileInfo.id,
								name: profileInfo.name,
								image_link: profileInfo.avatar
							}}
							mainPath={`${mainPath}/surveys`}
						/>
					)}
				/>
				<Route path={`${mainPath}/tops`} component={UserTops} />
				<Route path={`${mainPath}/lists`} component={UserLists} />
				<Route path={`${mainPath}/watched`} component={UserWatched} />
			</Switch>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	profileInfo: rootState.profile.profileInfo,
	uploadUrl: rootState.profile.uploadUrl,
	userPosts: rootState.profile.userPosts
});

const actions = {
	uploadAvatar,
	cancelAvatar,
	setAvatar,
	getUsersPosts
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserPageTabs);
