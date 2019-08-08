import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserProfile from '../UserProfile/UserProfile';
import UserActivity from '../UserActivity/UserActivity';
import UserReviews from '../UserReviews/UserReviews';
import UserEvents from '../UserEvents/UserEvents';
import UserSurveysNav from '../UserSurveys/UserSurveysNav';
import UserTops from '../UserTops/UserTops';
import UserLists from '../UserLists/UserLists';
import UserWatched from '../UserWatched/UserWatched';
import ProfileComponent from '../ProfileComponent/ProfileComponent';
import mock from '../Survey/mock';

const profileInfo = {
    name: "Sofi Dub",
    male: false,
    female: true,
    location: "KIev",
    about: "Give me films",
    photoSvg:  "https://s3-alpha-sig.figma.com/img/919e/1a5a/da4f250d469108191ad9d4af68b2a639?Expires=1566172800&Signature=Kou41Z8bd8ig~9nLibgCH5gfaOc0K~9Io82-umabjJnomveXbPcqMWfD911bHy6h77reHT6ecNYFHCzmXkQNy3vEF-OzgJYgV875TI2rX~cPt1FaSJC5wCeybEfTrlBlCcdzSFn8iVcP~C8GTx-l6CIjyugGAhvr7xJ-hfAdlf~5Mll0Sy92dSKn8q7OkJdfsMvEEFVQ3rGHn8GGQZg1a60gif0VaQhuVX1gcRgwrsak~cerS1bnDvo93B1lFOIk85wlhY2hPwQrmCtI9A-qaAtbIxmzmxkRpuVUpDrX6Jd4hXpksbd7urSJ91Dg7tv9WzRZvIkLnPXflCfmPw~slw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
}


const surveyInfo = {
    id: '1',
    created_at: new Date(2019, 7, 8, 13),
    name: 'Some survey',
    userInfo: {
        name: 'Sofi Dib',
        image_url:  "https://s3-alpha-sig.figma.com/img/919e/1a5a/da4f250d469108191ad9d4af68b2a639?Expires=1566172800&Signature=Kou41Z8bd8ig~9nLibgCH5gfaOc0K~9Io82-umabjJnomveXbPcqMWfD911bHy6h77reHT6ecNYFHCzmXkQNy3vEF-OzgJYgV875TI2rX~cPt1FaSJC5wCeybEfTrlBlCcdzSFn8iVcP~C8GTx-l6CIjyugGAhvr7xJ-hfAdlf~5Mll0Sy92dSKn8q7OkJdfsMvEEFVQ3rGHn8GGQZg1a60gif0VaQhuVX1gcRgwrsak~cerS1bnDvo93B1lFOIk85wlhY2hPwQrmCtI9A-qaAtbIxmzmxkRpuVUpDrX6Jd4hXpksbd7urSJ91Dg7tv9WzRZvIkLnPXflCfmPw~slw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
    },
    description: "a simple survey about people's preferences",
    participants: 5,
    questions: [
        {
            id: '1',
            question: 'how r u?',
            options: [
                {
                    text: 'good',
                    id: '1'
                },
                {
                    text: 'bad',
                    id: '2'
                }
            ],
            type: 'single'
        },
        {
            id: '2',
            question: 'how r u?',
            options: [
                {
                    text: 'good',
                    id: '1'
                },
                {
                    text: 'bad',
                    id: '2'
                }
            ],
            type: 'multiple'
        }
    ]
}

const surveys = mock;

interface IProps {
    mainPath: string
}

const UserPageTabs: React.SFC<IProps> = ({ mainPath }) => {
    return (
        <div className="user-tab-body">
            <Switch>
                <Route exact path={`${mainPath}`} render={() => <ProfileComponent profileInfo={profileInfo}/>} />
                <Route path={`${mainPath}/activity`} component={UserActivity} />
                <Route path={`${mainPath}/reviews`} component={UserReviews} />
                <Route path={`${mainPath}/events`} component={UserEvents} />
                <Route path={`${mainPath}/surveys`} render={(props) => (
                    <UserSurveysNav mainPath={`${mainPath}/surveys`} surveys={surveys} />
                )}/>
                <Route path={`${mainPath}/tops`} component={UserTops} />
                <Route path={`${mainPath}/lists`} component={UserLists} />
                <Route path={`${mainPath}/watched`} component={UserWatched} />
            </Switch>
        </div>
    );
}

export default UserPageTabs;