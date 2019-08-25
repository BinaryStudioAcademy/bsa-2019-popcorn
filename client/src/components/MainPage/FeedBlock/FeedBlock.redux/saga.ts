import { all, call, put, takeEvery } from '@redux-saga/core/effects';
import {
	CREATE_COMMENT,
	CREATE_REACTION,
	FETCH_POSTS,
	SET_POSTS,
	DELETE_POST
} from './actionTypes';

import webApi from '../../../../services/webApi.service';
import config from '../../../../config';
import { USER_POSTS } from '../../../UserPage/actionTypes';

export function* fetchPosts(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: '/api/post'
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

export function* createComment(action) {
	const { userId, text, postId } = action.payload;
	try {
		yield call(webApi, {
			method: 'POST',
			endpoint: '/api/post/comment',
			body: {
				userId,
				text,
				postId
			},
			parse: false
		});
	} catch (e) {
		console.log('createComment: ', e.message);
	}
}

export function* createReaction(action) {
	const { userId, type, postId } = action.payload;
	try {
		yield call(webApi, {
			method: 'POST',
			endpoint: '/api/post/reaction',
			body: {
				userId,
				type,
				postId
			},
			parse: false
		});
	} catch (e) {
		console.log('createReaction: ', e.message);
	}
}

export function* deletePost(action) {
	try {
		yield call(webApi, {
			method: 'DELETE',
			endpoint: '/api/post/' + action.payload.id
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
function* watchFetch() {
	yield takeEvery(FETCH_POSTS, fetchPosts);
}

function* watchCreateComment() {
	yield takeEvery(CREATE_COMMENT, createComment);
}

function* watchCreateReaction() {
	yield takeEvery(CREATE_REACTION, createReaction);
}

function* watchDeletePost() {
	yield takeEvery(DELETE_POST, deletePost);
}
export default function* feed() {
	yield all([
		watchFetch(),
		watchCreateComment(),
		watchCreateReaction(),
		watchDeletePost()
	]);
}
