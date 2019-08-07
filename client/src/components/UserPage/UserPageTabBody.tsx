import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserProfile from '../UserProfile/UserProfile';
import UserActivity from '../UserActivity/UserActivity';
import UserReviews from '../UserReviews/UserReviews';
import UserEvents from '../UserEvents/UserEvents';
import UserSurveys from '../UserSurveys/UserSurveys';
import UserTops from '../UserTops/UserTops';
import UserLists from '../UserLists/UserLists';
import UserWatched from '../UserWatched/UserWatched';

interface IProps {
    mainPath: string
}

const UserPageTabs: React.SFC<IProps> = ({ mainPath }) => {
    return (
        <div className="user-tab-body">
            <Switch>
                <Route exact path={`${mainPath}`} component={UserProfile} />
                <Route path={`${mainPath}/activity`} component={UserActivity} />
                <Route path={`${mainPath}/reviews`} component={UserReviews} />
                <Route path={`${mainPath}/events`} component={UserEvents} />
                <Route path={`${mainPath}/surveys`} component={UserSurveys} />
                <Route path={`${mainPath}/tops`} component={UserTops} />
                <Route path={`${mainPath}/lists`} component={UserLists} />
                <Route path={`${mainPath}/watched`} component={UserWatched} />
            </Switch>
        </div>
    );
}

export default UserPageTabs;