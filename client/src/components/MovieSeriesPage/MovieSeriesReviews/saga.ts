import { all, call, put, takeEvery } from 'redux-saga/effects';
import webApi from '../../../services/webApi.service';
import config from '../../../config';
import {
	FETCH_MOVIE_REVIEWS,
	FETCH_MOVIE_REVIEWS_SUCCESS
} from './actionTypes';
import {
	FETCH_USER_REVIEWS,
	FETCH_USER_REVIEWS_SUCCESS
} from '../../UserPage/UserReviews/actionTypes';

export function* fetchMovieReviews(action) {
	try {
		const response = yield call(webApi, {
			endpoint: `${config.API_URL}/api/review/movie/${action.payload}`,
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
	}
}

export function* fetchUserReviews(action) {
	const { userId } = action.payload;
	try {
		const response = yield call(webApi, {
			endpoint: `${config.API_URL}/api/review/user/${userId}`,
			method: 'GET'
		});
		console.log(response);

		yield put({
			type: FETCH_USER_REVIEWS_SUCCESS,
			payload: {
				reviewUserList: response
			}
		});
	} catch (e) {
		console.log(e);
	}
}

function* watchLoadMoreReviews() {
	yield takeEvery(FETCH_MOVIE_REVIEWS, fetchMovieReviews);
}

function* watchfetchUserReviews() {
	yield takeEvery(FETCH_USER_REVIEWS, fetchUserReviews);
}

export default function* review() {
	yield all([watchLoadMoreReviews(), watchfetchUserReviews()]);
}
