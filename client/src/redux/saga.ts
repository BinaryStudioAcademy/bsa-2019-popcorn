import {all} from 'redux-saga/effects';
import headerSaga from '../components/MovieSeriesPage/Movie.redux/saga';
import profileSaga from '../components/UserPage/saga';
import storySaga from '../components/MainPage/StoryList/story.redux/saga';

export default function* rootSaga() {
    yield all([headerSaga(), profileSaga(), storySaga()]);
}
