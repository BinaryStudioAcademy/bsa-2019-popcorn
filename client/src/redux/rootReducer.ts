import { combineReducers } from 'redux';
import movieReducer from '../components/MovieSeriesPage/Movie.redux/reducer';
import profileHeader from '../components/UserPage/reducer';
import storyReducer from '../components/MainPage/StoryList/story.redux/reducer';
import feedReducer from '../components/MainPage/FeedBlock/FeedBlock.redux/reducer';
import eventsReducer from '../components/UserPage/UserEvents/reduser';
import userTopsReducer from '../components/UserPage/UserTops/UserTops.redux/reducer';
import adminPanelReducer from '../components/AdminPanelPage/AdminPanelPage.redux/reducer';
import surveyReducer from '../components/UserPage/UserSurveys/UserSurveys.redux/reducer';
import reviewReducer from '../components/MovieSeriesPage/MovieSeriesReviews/reducer';
import topListReducer from '../components/TopListPage/TopListPage.redux/reducer';
import followReducer from '../components/UserPage/ProfileComponent/FollowSystem/FollowSystem.redux/reducer';
import watchListReducer from '../components/UserPage/UserWatchList/reducer';
import searchMovieReducer from '../components/shared/MovieSearch/reducer';
import notificationReducer from '../components/shared/Header/reducer';
import movieListReducer from '../components/UserPage/UserLists/reducer';

const reducers = {};

export default combineReducers({
	...reducers,
	movie: movieReducer,
	profile: profileHeader,
	story: storyReducer,
	feed: feedReducer,
	events: eventsReducer,
	userTops: userTopsReducer,
	adminPanel: adminPanelReducer,
	survey: surveyReducer,
	review: reviewReducer,
	topList: topListReducer,
	follow: followReducer,
	watchList: watchListReducer,
	searchMovie: searchMovieReducer,
	notification: notificationReducer,
	movieList: movieListReducer
});
