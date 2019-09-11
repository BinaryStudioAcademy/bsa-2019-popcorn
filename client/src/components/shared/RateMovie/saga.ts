import { all, call, put, takeEvery } from '@redux-saga/core/effects';
import webApi from '../../../services/webApi.service';
import {
	FETCH_USER_RATES,
	FETCH_USER_RATES_SUCCESS,
	SAVE_USER_RATE,
	SAVE_USER_RATE_SUCCESS,
	DELETE_USER_RATE_SUCCESS,
	DELETE_USER_RATE
} from './actionTypes';
import { FETCH_MOVIE_BY_ID } from '../../MovieSeriesPage/Movie.redux/actionTypes';

export function* fetchUserRates(action) {
	try {
		const userRates = yield call(webApi, {
			method: 'GET',
			endpoint: '/api/movie/rate/user/all'
		});

		yield put({
			type: FETCH_USER_RATES_SUCCESS,
			payload: { userRates }
		});
	} catch (e) {
		console.log(e);
	}
}

export function* saveUserRate(action) {
	const { userRate } = action.payload;
	try {
		const newUserRate = yield call(webApi, {
			method: 'POST',
			endpoint: '/api/movie/rate',
			body: { ...userRate }
		});

		yield put({
			type: SAVE_USER_RATE_SUCCESS,
			payload: { userRate: newUserRate }
		});

		yield put({
			type: FETCH_MOVIE_BY_ID,
			payload: { movieId: userRate.movieId }
		});
	} catch (e) {
		console.log(e);
	}
}

export function* deleteUserRate(action) {
	const { userRate } = action.payload;
	try {
		yield call(webApi, {
			method: 'DELETE',
			endpoint: `/api/movie/rate/${userRate.id}`
		});

		yield put({
			type: DELETE_USER_RATE_SUCCESS,
			payload: { rateId: userRate.id }
		});

		yield put({
			type: FETCH_MOVIE_BY_ID,
			payload: { movieId: userRate.movieId }
		});
	} catch (e) {
		console.log(e);
	}
}

function* watchFetchUserRates() {
	yield takeEvery(FETCH_USER_RATES, fetchUserRates);
}

function* watchSaveUserRate() {
	yield takeEvery(SAVE_USER_RATE, saveUserRate);
}

function* watchDeleteUserRate() {
	yield takeEvery(DELETE_USER_RATE, deleteUserRate);
}

export default function* rating() {
	yield all([
		watchFetchUserRates(),
		watchSaveUserRate(),
		watchDeleteUserRate()
	]);
}
