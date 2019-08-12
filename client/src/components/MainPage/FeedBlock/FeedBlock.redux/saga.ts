import { all, takeEvery, call, put } from '@redux-saga/core/effects';
import { FETCH_POSTS, SET_POSTS } from './actionTypes';
import webApi from '../../../../services/webApi.service';
import config from '../../../../config';

export function* fetchPosts(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/post'
		});

		yield put({
			type: SET_POSTS,
			payload: {
				posts: data
			}
		});
	} catch (e) {
		console.log('feed saga fetch posts: ', e.message);
	}
}

function* watchFetch() {
	yield takeEvery(FETCH_POSTS, fetchPosts);
}

export default function* feed() {
	yield all([watchFetch()]);
}
