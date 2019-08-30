import { all, call, put, takeEvery } from 'redux-saga/effects';
import webApi from '../../../services/webApi.service';
import {
	FETCH_USER_WATCH_LIST,
	FETCH_USER_WATCH_LIST_SUCCESS,
	SAVE_WATCH_ITEM,
	SAVE_WATCH_ITEM_SUCCESS,
	MOVE_WATCH_ITEM_TO_WATCHED,
	DELETE_WATCH_ITEM,
	FETCH_WATCH_LIST_STATUS,
	FETCH_WATCH_LIST_STATUS_SUCCESS,
	ADD_MOVIE_TO_WATCH_LIST,
	ADD_MOVIE_TO_WATCH_LIST_SUCCESS,
	DELETE_MOVIE_FROM_WATCH_LIST,
	DELETE_MOVIE_FROM_WATCH_LIST_SUCCESS
} from './actionTypes';

export function* fetchWatchList(action) {
	try {
		const { userId } = action.payload;

		const watchList = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/watch/user/${userId}`
		});

		yield put({
			type: FETCH_USER_WATCH_LIST_SUCCESS,
			payload: { watchList }
		});
	} catch (error) {
		console.log(error);
	}
}

export function* saveWatchItem(action) {
	const { movie } = action.payload;
	try {
		const newWatch = yield call(webApi, {
			endpoint: `/api/watch`,
			method: 'POST',
			body: {
				movieId: movie.id,
				status: 'to_watch'
			}
		});

		yield put({
			type: SAVE_WATCH_ITEM_SUCCESS,
			payload: { movie, status: 'to_watch', id: newWatch.id }
		});
	} catch (error) {
		console.log(error);
	}
}

export function* moveToWatched(action) {
	const { watchId } = action.payload;
	try {
		yield call(webApi, {
			endpoint: `/api/watch/${watchId}`,
			method: 'PUT'
		});
	} catch (error) {
		console.log(error);
	}
}

export function* deleteWatchItem(action) {
	const { watchId } = action.payload;
	try {
		yield call(webApi, {
			endpoint: `/api/watch/${watchId}`,
			method: 'DELETE'
		});
	} catch (error) {
		console.log(error);
	}
}

export function* fetchWatchListStatus(action) {
	const { movieId } = action.payload;
	try {
		const watchListStatus = yield call(webApi, {
			endpoint: `/api/watch/movie/${movieId}`,
			method: 'GET'
		});

		yield put({
			type: FETCH_WATCH_LIST_STATUS_SUCCESS,
			payload: { watchListStatus }
		});
	} catch (error) {
		console.log(error);
	}
}

export function* addMovieToWatchList(action) {
	const { movieId } = action.payload;
	try {
		const { id } = yield call(webApi, {
			endpoint: `/api/watch`,
			method: 'POST',
			body: {
				movieId: movieId,
				status: 'to_watch'
			}
		});

		yield put({
			type: ADD_MOVIE_TO_WATCH_LIST_SUCCESS,
			payload: { status: 'to_watch', movieId, id }
		});
	} catch (error) {
		console.log(error);
	}
}

export function* deleteMovieFromWatchList(action) {
	const { watchId, movieId } = action.payload;
	try {
		yield call(webApi, {
			endpoint: `/api/watch/${watchId}`,
			method: 'DELETE'
		});

		yield put({
			type: DELETE_MOVIE_FROM_WATCH_LIST_SUCCESS,
			payload: {
				watchListStatus: {
					status: null,
					movieId
				}
			}
		});
	} catch (error) {
		console.log(error);
	}
}

function* watchFetchWatchList() {
	yield takeEvery(FETCH_USER_WATCH_LIST, fetchWatchList);
}

function* watchSaveWatchItem() {
	yield takeEvery(SAVE_WATCH_ITEM, saveWatchItem);
}

function* watchMoveToWatched() {
	yield takeEvery(MOVE_WATCH_ITEM_TO_WATCHED, moveToWatched);
}

function* watchDeleteWatchItem() {
	yield takeEvery(DELETE_WATCH_ITEM, deleteWatchItem);
}

function* watchFetchWatchListStatus() {
	yield takeEvery(FETCH_WATCH_LIST_STATUS, fetchWatchListStatus);
}

function* watchAddMovieToWatchList() {
	yield takeEvery(ADD_MOVIE_TO_WATCH_LIST, addMovieToWatchList);
}

function* watchDeleteMovieFromWatchList() {
	yield takeEvery(DELETE_MOVIE_FROM_WATCH_LIST, deleteMovieFromWatchList);
}

export default function* watchList() {
	yield all([
		watchFetchWatchList(),
		watchSaveWatchItem(),
		watchMoveToWatched(),
		watchDeleteWatchItem(),
		watchFetchWatchListStatus(),
		watchAddMovieToWatchList(),
		watchDeleteMovieFromWatchList()
	]);
}
