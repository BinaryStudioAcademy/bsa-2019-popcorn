import { all } from 'redux-saga/effects';
import headerSaga from '../components/MovieSeriesPage/Movie.redux/saga';
import profileSaga from '../components/UserPage/saga';

export default function* rootSaga() {
	yield all([headerSaga(), profileSaga()]);
}
