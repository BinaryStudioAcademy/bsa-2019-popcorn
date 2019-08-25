import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	FETCH_FOLLOWERS_COUNT,
	SET_FOLLOWERS_COUNT,
	FETCH_FOLLOWINGS_COUNT,
	SET_FOLLOWINGS_COUNT
} from './actionTypes';
import config from '../../../../../config';
import webApi from '../../../../../services/webApi.service';

export function* fetchFollowersCount(action) {
	try {
		const { count } = yield call(webApi, {
			method: 'GET',
			endpoint:
				config.API_URL +
				'/api/follow/' +
				action.payload.userId +
				'/followers/count'
		});

		yield put({
			type: SET_FOLLOWERS_COUNT,
			payload: {
				count
			}
		});
	} catch (e) {
		console.log('follow saga fetch followers count:', e.message);
	}
}

function* watchFetchFollowersCount() {
	yield takeEvery(FETCH_FOLLOWERS_COUNT, fetchFollowersCount);
}

export function* fetchFollowingsCount(action) {
	try {
		const { count } = yield call(webApi, {
			method: 'GET',
			endpoint:
				config.API_URL +
				'/api/follow/' +
				action.payload.userId +
				'/followings/count'
		});

		yield put({
			type: SET_FOLLOWINGS_COUNT,
			payload: {
				count
			}
		});
	} catch (e) {
		console.log('follow saga fetch followings count:', e.message);
	}
}

function* watchFetchFollowingsCount() {
	yield takeEvery(FETCH_FOLLOWINGS_COUNT, fetchFollowingsCount);
}

export default function* follow() {
	yield all([watchFetchFollowersCount(), watchFetchFollowingsCount()]);
}
