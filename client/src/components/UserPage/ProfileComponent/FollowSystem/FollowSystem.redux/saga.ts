import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	FETCH_FOLLOWERS_COUNT,
	SET_FOLLOWERS_COUNT,
	FETCH_FOLLOWINGS_COUNT,
	SET_FOLLOWINGS_COUNT,
	FETCH_FOLLOWERS,
	FETCH_FOLLOWINGS,
	SET_FOLLOWERS,
	SET_FOLLOWINGS,
	CHECK_STATUS,
	SET_STATUS,
	CHANGE_STATUS
} from './actionTypes';
import webApi from '../../../../../services/webApi.service';

export function* fetchFollowersCount(action) {
	try {
		const { count } = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/follow/${action.payload.userId}/followers/count`
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

export function* fetchFollowers(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/follow/${action.payload.userId}/followers`
		});

		yield put({
			type: SET_FOLLOWERS,
			payload: {
				userId: action.payload.userId,
				data
			}
		});
	} catch (e) {
		console.log('follow saga fetch followings count:', e.message);
	}
}

function* watchFetchFollowers() {
	yield takeEvery(FETCH_FOLLOWERS, fetchFollowers);
}

export function* fetchFollowingsCount(action) {
	try {
		const { count } = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/follow/${action.payload.userId}/followings/count`
		});

		yield put({
			type: SET_FOLLOWINGS_COUNT,
			payload: {
				count
			}
		});
	} catch (e) {
		console.log('follow saga fetch followings:', e.message);
	}
}

function* watchFetchFollowingsCount() {
	yield takeEvery(FETCH_FOLLOWINGS_COUNT, fetchFollowingsCount);
}

export function* fetchFollowings(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/follow/${action.payload.userId}/followings`
		});

		yield put({
			type: SET_FOLLOWINGS,
			payload: {
				userId: action.payload.userId,
				data
			}
		});
	} catch (e) {
		console.log('follow saga fetch followers:', e.message);
	}
}

function* watchFetchFollowings() {
	yield takeEvery(FETCH_FOLLOWINGS, fetchFollowings);
}

export function* checkStatus(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/follow/${action.payload.userId}/${action.payload.followerId}`
		});

		yield put({
			type: SET_STATUS,
			payload: {
				data
			}
		});
	} catch (e) {
		console.log('follow saga check status:', e.message);
	}
}

function* watchCheckStatus() {
	yield takeEvery(CHECK_STATUS, checkStatus);
}

export function* changeStatus(action) {
	try {
		yield call(webApi, {
			method: 'POST',
			endpoint: `/api/follow`,
			body: {
				userId: action.payload.userId,
				followerId: action.payload.followerId
			}
		});

		yield put({
			type: CHECK_STATUS,
			payload: {
				userId: action.payload.userId,
				followerId: action.payload.followerId
			}
		});

		yield put({
			type: FETCH_FOLLOWERS_COUNT,
			payload: {
				userId: action.payload.followerId
			}
		});
	} catch (e) {
		console.log('follow saga change status:', e.message);
	}
}

function* watchChangeStatus() {
	yield takeEvery(CHANGE_STATUS, changeStatus);
}

export default function* follow() {
	yield all([
		watchFetchFollowersCount(),
		watchFetchFollowingsCount(),
		watchFetchFollowers(),
		watchFetchFollowings(),
		watchCheckStatus(),
		watchChangeStatus()
	]);
}
