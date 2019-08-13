import { all, takeEvery, call, put } from '@redux-saga/core/effects';
import * as ActionType from './actionTypes';
import webApi from '../../../services/webApi.service';
import config from '../../../config';

export function* fetchUsers(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/user'
		});

		yield put({
			type: ActionType.SET_USERS,
			payload: {
				users: data
			}
		});
	} catch (e) {
		console.log('feed saga fetch users: ', e.message);
	}
}

function* watchFetchUsers() {
	yield takeEvery(ActionType.FETCH_USERS, fetchUsers);
}

export function* fetchMovies(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/movie'
		});

		yield put({
			type: ActionType.SET_MOVIES,
			payload: {
				movies: data
			}
		});
	} catch (e) {
		console.log('feed saga fetch movies: ', e.message);
	}
}

function* watchFetchMovies() {
	yield takeEvery(ActionType.FETCH_MOVIES, fetchMovies);
}

export function* fetchPosts(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/post'
		});

		yield put({
			type: ActionType.SET_POSTS,
			payload: {
				posts: data
			}
		});
	} catch (e) {
		console.log('feed saga fetch posts: ', e.message);
	}
}

function* watchFetchPosts() {
	yield takeEvery(ActionType.FETCH_POSTS, fetchPosts);
}

export function* fetchTops(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/top'
		});

		yield put({
			type: ActionType.SET_TOPS,
			payload: {
				tops: data
			}
		});
	} catch (e) {
		console.log('feed saga fetch tops: ', e.message);
	}
}

function* watchFetchTops() {
	yield takeEvery(ActionType.FETCH_TOPS, fetchTops);
}

export function* fetchStories(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/story'
		});

		yield put({
			type: ActionType.SET_STORIES,
			payload: {
				stories: data
			}
		});
	} catch (e) {
		console.log('feed saga fetch stories: ', e.message);
	}
}

function* watchFetchStories() {
	yield takeEvery(ActionType.FETCH_STORIES, fetchStories);
}

export function* fetchEvents(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/event'
		});

		yield put({
			type: ActionType.SET_EVENTS,
			payload: {
				events: data
			}
		});
	} catch (e) {
		console.log('feed saga fetch events: ', e.message);
	}
}

function* watchFetchEvents() {
	yield takeEvery(ActionType.FETCH_EVENTS, fetchEvents);
}

export function* fetchVoting(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/voting'
		});

		yield put({
			type: ActionType.SET_VOTING,
			payload: {
				voting: data
			}
		});
	} catch (e) {
		console.log('feed saga fetch voting: ', e.message);
	}
}

function* watchFetchVoting() {
	yield takeEvery(ActionType.FETCH_VOTING, fetchVoting);
}

export default function* feed() {
	yield all([
		watchFetchUsers(),
		watchFetchMovies(),
		watchFetchPosts(),
		watchFetchTops(),
		watchFetchStories(),
		watchFetchEvents(),
		watchFetchVoting()
	]);
}
