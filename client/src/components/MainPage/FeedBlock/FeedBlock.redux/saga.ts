import { all, takeEvery, call, put } from '@redux-saga/core/effects';
import { FETCH_POSTS, SET_POSTS, DELETE_POST } from './actionTypes';
import webApi from '../../../../services/webApi.service';
import config from '../../../../config';
import { USER_POSTS } from '../../../UserPage/actionTypes';

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

export function* deletePost(action) {
	try {
		yield call(webApi, {
			method: 'DELETE',
			endpoint: config.API_URL + '/api/post/' + action.payload.id
		});

		yield put({
			type: USER_POSTS,
			payload: { id: action.payload.userId }
		});

		yield put({ type: FETCH_POSTS });
	} catch (e) {
		console.log('feed saga delete post: ', e.message);
	}
}

function* watchDeletePost() {
	yield takeEvery(DELETE_POST, deletePost);
}

export default function* feed() {
	yield all([watchFetch(), watchDeletePost()]);
}
