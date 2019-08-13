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

		const users = data.data.users;

		yield put({
			type: ActionType.SET_USERS,
			payload: {
				users
			}
		});
	} catch (e) {
		console.log('feed saga fetch users: ', e.message);
	}
}

function* watchFetchUsers() {
	yield takeEvery(ActionType.FETCH_USERS, fetchUsers);
}

export function* deleteUser(action) {
	try {
		const { userId } = action.payload;

		const data = yield call(webApi, {
			method: 'DELETE',
			endpoint: config.API_URL + `/api/user/${userId}`
		});

		yield put({
			type: ActionType.DELETE_USERS_SUCCESS,
			payload: {
				userId
			}
		});
	} catch (e) {
		console.log('feed saga delete user: ', e.message);
	}
}

function* watchDeleteUser() {
	yield takeEvery(ActionType.DELETE_USERS, deleteUser);
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

export function* deleteMovie(action) {
	try {
		const { movieId } = action.payload;

		const data = yield call(webApi, {
			method: 'DELETE',
			endpoint: config.API_URL + `/api/movie/${movieId}`
		});

		yield put({
			type: ActionType.DELETE_MOVIES_SUCCESS,
			payload: {
				movieId
			}
		});
	} catch (e) {
		console.log('feed saga delete movie: ', e.message);
	}
}

function* watchDeleteMovie() {
	yield takeEvery(ActionType.DELETE_MOVIES, deleteMovie);
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

export function* deletePost(action) {
	try {
		const { postId } = action.payload;

		const data = yield call(webApi, {
			method: 'DELETE',
			endpoint: config.API_URL + `/api/post/${postId}`
		});

		yield put({
			type: ActionType.DELETE_POSTS_SUCCESS,
			payload: {
				postId
			}
		});
	} catch (e) {
		console.log('feed saga delete post: ', e.message);
	}
}

function* watchDeletePost() {
	yield takeEvery(ActionType.DELETE_POSTS, deletePost);
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

export function* deleteTop(action) {
	try {
		const { topId } = action.payload;

		const data = yield call(webApi, {
			method: 'DELETE',
			endpoint: config.API_URL + `/api/top/${topId}`
		});

		yield put({
			type: ActionType.DELETE_TOPS_SUCCESS,
			payload: {
				topId
			}
		});
	} catch (e) {
		console.log('feed saga delete top: ', e.message);
	}
}

function* watchDeleteTop() {
	yield takeEvery(ActionType.DELETE_TOPS, deleteTop);
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

export function* deleteStory(action) {
	try {
		const { storyId } = action.payload;

		const data = yield call(webApi, {
			method: 'DELETE',
			endpoint: config.API_URL + `/api/story/${storyId}`
		});

		yield put({
			type: ActionType.DELETE_STORIES_SUCCESS,
			payload: {
				storyId
			}
		});
	} catch (e) {
		console.log('feed saga delete story: ', e.message);
	}
}

function* watchDeleteStory() {
	yield takeEvery(ActionType.DELETE_STORIES, deleteStory);
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

export function* deleteEvent(action) {
	try {
		const { eventId } = action.payload;

		const data = yield call(webApi, {
			method: 'DELETE',
			endpoint: config.API_URL + `/api/event/${eventId}`
		});

		yield put({
			type: ActionType.DELETE_EVENTS_SUCCESS,
			payload: {
				eventId
			}
		});
	} catch (e) {
		console.log('feed saga delete event: ', e.message);
	}
}

function* watchDeleteEvent() {
	yield takeEvery(ActionType.DELETE_EVENTS, deleteEvent);
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

export function* deleteVoting(action) {
	try {
		const { votingId } = action.payload;

		const data = yield call(webApi, {
			method: 'DELETE',
			endpoint: config.API_URL + `/api/voting/${votingId}`
		});

		yield put({
			type: ActionType.DELETE_VOTING_SUCCESS,
			payload: {
				votingId
			}
		});
	} catch (e) {
		console.log('feed saga delete voting: ', e.message);
	}
}

function* watchDeleteVoting() {
	yield takeEvery(ActionType.DELETE_VOTING, deleteVoting);
}

export default function* adminPanel() {
	yield all([
		watchFetchUsers(),
		watchDeleteUser(),

		watchFetchMovies(),
		watchDeleteMovie(),

		watchFetchPosts(),
		watchDeletePost(),

		watchFetchTops(),
		watchDeleteTop(),

		watchFetchStories(),
		watchDeleteStory(),

		watchFetchEvents(),
		watchDeleteEvent(),

		watchFetchVoting(),
		watchDeleteVoting()
	]);
}
