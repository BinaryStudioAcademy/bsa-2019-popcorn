import { all, call, put, takeEvery } from 'redux-saga/effects';
import webApi from '../../../services/webApi.service';
import config from '../../../config';
import {
	FETCH_MOVIE_REVIEWS,
	FETCH_MOVIE_REVIEWS_SUCCESS
} from './actionTypes';

export function* fetchMovieReviews(action) {
	try {
		const response = yield call(webApi, {
			endpoint: `${config.API_URL}/api/review/${action.payload}`,
			method: 'GET'
		});

		yield put({
			type: FETCH_MOVIE_REVIEWS_SUCCESS,
			payload: {
				reviews: response.reviews
			}
		});
	} catch (e) {
		console.log(e);
		// TODO show error
	}
}

function* watchLoadMoreMovie() {
	yield takeEvery(FETCH_MOVIE_REVIEWS, fetchMovieReviews);
}

export default function* review() {
	yield all([watchLoadMoreMovie()]);
}
