import { all } from 'redux-saga/effects';
import headerSaga from '../components/MovieSeriesPage/Movie.redux/saga';
import profileSaga from '../components/UserPage/saga';
import storySaga from '../components/MainPage/StoryList/story.redux/saga';
import feedSaga from '../components/MainPage/FeedBlock/FeedBlock.redux/saga';
import eventsSaga from '../components/UserPage/UserEvents/saga';
import userTopsSaga from '../components/UserPage/UserTops/UserTops.redux/saga';
// import adminPanelSaga from '../components/AdminPanelPage/AdminPanelPage.redux/saga';
import surveySaga from '../components/UserPage/UserSurveys/UserSurveys.redux/saga';
import reviewSaga from '../components/MovieSeriesPage/MovieSeriesReviews/saga';
import topListSaga from '../components/TopListPage/TopListPage.redux/saga';
import followSaga from '../components/UserPage/ProfileComponent/FollowSystem/FollowSystem.redux/saga';
import settingsSaga from '../components/UserSettings/saga';
import watchListSaga from '../components/UserPage/UserWatchList/saga';
import searchMovieSaga from '../components/shared/MovieSearch/saga';
import notificationSaga from '../components/shared/Header/saga';
import recommendedSaga from '../components/MainPage/RecommendList/RecommendList.redux/saga';
import chatSaga from '../components/ChatPage/ChatPage.redux/saga';
import contentSearchSaga from '../components/shared/ContentSearch/redux/saga';
import movieListSaga from '../components/UserPage/UserLists/saga';
import movieRateSaga from '../components/shared/RateMovie/saga';
export default function* rootSaga() {
	yield all([
		headerSaga(),
		profileSaga(),
		storySaga(),
		feedSaga(),
		eventsSaga(),
		userTopsSaga(),
		// adminPanelSaga(),
		surveySaga(),
		reviewSaga(),
		topListSaga(),
		followSaga(),
		settingsSaga(),
		watchListSaga(),
		searchMovieSaga(),
		notificationSaga(),
		recommendedSaga(),
		chatSaga(),
		contentSearchSaga(),
		movieListSaga(),
		movieRateSaga()
	]);
}
