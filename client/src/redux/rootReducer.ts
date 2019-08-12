import { combineReducers } from 'redux';
import movieReducer from '../components/MovieSeriesPage/Movie.redux/reducer';
import profileHeader from '../components/UserPage/reducer';
import storyReducer from '../components/MainPage/StoryList/story.redux/reducer';

const reducers = {};

export default combineReducers({
	...reducers,
	movie: movieReducer,
	profile: profileHeader,
	story: storyReducer
});
