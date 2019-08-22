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
import ISelectedProfileInfo from './SelectedProfileInterface';
import mock from './Survey/mock';
import {
	cancelAvatar,
	getUsersPosts,
	setAvatar,
	uploadAvatar,
	saveCropped
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
		aboutMe: string;
		avatar: string;
	};
	uploadUrl?: string;
	cancelAvatar: () => any;
	setAvatar: (url: string, id: string) => any;
	userPosts?: any; //todo
	getUsersPosts: (id: string) => any;
	selectedProfileInfo: ISelectedProfileInfo;
	croppedSaved: boolean;
	saveCropped: () => void;
}

const UserPageTabs: React.SFC<IProps> = ({
	mainPath,
	uploadAvatar,
	profileInfo,
	uploadUrl,
	cancelAvatar,
	setAvatar,
	userPosts,
	getUsersPosts,
	selectedProfileInfo,
	croppedSaved,
	saveCropped
}) => {
	return selectedProfileInfo ? (
		<div className={'user-tab-body'}>
			<Switch>
				<Route
					exact
					path={`${mainPath}`}
					render={() => (
						<ProfileComponent
							uploadAvatar={uploadAvatar}
							profileInfo={selectedProfileInfo}
							uploadUrl={uploadUrl}
							cancelAvatar={cancelAvatar}
							setAvatar={setAvatar}
							croppedSaved={croppedSaved}
							saveCropped={saveCropped}
						/>
					)}
				/>
				<Route
					path={`${mainPath}/posts`}
					component={() => (
						<UserPosts
							userId={selectedProfileInfo.id}
							posts={userPosts}
							saveCropped={saveCropped}
							croppedSaved={croppedSaved}
							getUsersPosts={() => getUsersPosts(selectedProfileInfo.id)}
						/>
					)}
				/>
				<Route path={`${mainPath}/reviews`} component={UserReviews} />
				<Route path={`${mainPath}/events`} component={UserEvents} />
				<Route
					path={`${mainPath}/surveys`}
					render={props => (
						<UserSurveysNav
							id={profileInfo.id}
							userInfo={{
								id: selectedProfileInfo.id,
								name: selectedProfileInfo.name,
								image_link: selectedProfileInfo.avatar
							}}
							type={'specific'}
							mainPath={`${mainPath}/surveys`}
						/>
					)}
				/>
				<Route path={`${mainPath}/tops`} component={UserTops} />
				<Route path={`${mainPath}/lists`} component={UserLists} />
				<Route path={`${mainPath}/watched`} component={UserWatched} />
			</Switch>
		</div>
	) : null;
};

const mapStateToProps = (rootState, props) => ({
	...props,
	profileInfo: rootState.profile.profileInfo,
	uploadUrl: rootState.profile.uploadUrl,
	userPosts: rootState.profile.userPosts,
	selectedProfileInfo: rootState.profile.selectedProfileInfo,
	croppedSaved: rootState.profile.croppedSaved
});

const actions = {
	uploadAvatar,
	cancelAvatar,
	setAvatar,
	getUsersPosts,
	saveCropped
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserPageTabs);
