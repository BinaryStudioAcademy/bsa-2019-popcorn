import React from 'react';
import {Route, Switch} from 'react-router-dom';
import UserActivity from './UserActivity/UserActivity';
import UserReviews from './UserReviews/UserReviews';
import UserEvents from './UserEvents/UserEvents';
import UserSurveys from './UserSurveys/UserSurveys';
import UserTops from './UserTops/UserTops';
import UserLists from './UserLists/UserLists';
import UserWatched from './UserWatched/UserWatched';
import ProfileComponent from './ProfileComponent/ProfileComponent';
import {cancelAvatar, uploadAvatar} from './actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


interface IProps {
    mainPath: string,
    uploadAvatar: (FormData, string) => any,
    profileInfo: {
        id: string,
        name: string,
        male: boolean,
        female: boolean,
        location: string,
        about: string,
        avatar: string
    },
    uploadUrl?: string,
    cancelAvatar: () => any
}

const UserPageTabs: React.SFC<IProps> = ({mainPath, uploadAvatar, profileInfo, uploadUrl, cancelAvatar}) => {

    return (
        <div className={"user-tab-body"}>
            <Switch>
                <Route exact path={`${mainPath}`}
                       render={() => <ProfileComponent uploadAvatar={uploadAvatar} profileInfo={profileInfo}
                                                       uploadUrl={uploadUrl}
                                                       cancelAvatar={cancelAvatar}/>}/>
                <Route path={`${mainPath}/activity`} component={UserActivity}/>
                <Route path={`${mainPath}/reviews`} component={UserReviews}/>
                <Route path={`${mainPath}/events`} component={UserEvents}/>
                <Route path={`${mainPath}/surveys`} component={UserSurveys}/>
                <Route path={`${mainPath}/tops`} component={UserTops}/>
                <Route path={`${mainPath}/lists`} component={UserLists}/>
                <Route path={`${mainPath}/watched`} component={UserWatched}/>
            </Switch>
        </div>
    );
};

const mapStateToProps = (rootState, props) => ({
    ...props,
    profileInfo: rootState.profile.profileInfo,
    uploadUrl: rootState.profile.uploadUrl
});

const actions = {
    uploadAvatar,
    cancelAvatar
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPageTabs);