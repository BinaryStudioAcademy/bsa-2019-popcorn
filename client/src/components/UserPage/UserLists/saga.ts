import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	SAVE_MOVIE_LIST,
	FETCH_MOVIE_LISTS_PREVIEW,
	FETCH_MOVIE_LISTS_PREVIEW_SUCCESS,
	DELETE_MOVIE_LIST
} from './actionTypes';
import webApi from '../../../services/webApi.service';

export function* saveMovieList(action) {
	const { movieList } = action.payload;
	try {
		yield call(webApi, {
			method: 'POST',
			endpoint: '/api/movie-list',
			body: { ...movieList }
		});
	} catch (e) {
		console.log(e.message);
	}
}

export function* fetchMovieListsPreview(action) {
	try {
		const movieListsPreview = yield call(webApi, {
			method: 'GET',
			endpoint: '/api/movie-list'
		});

		yield put({
			type: FETCH_MOVIE_LISTS_PREVIEW_SUCCESS,
			payload: { movieListsPreview }
		});
	} catch (e) {
		console.log(e.message);
	}
}

export function* deleteMovieList(action) {
	const { movieListId } = action.payload;
	console.log(movieListId);
	try {
		const movieListsPreview = yield call(webApi, {
			method: 'DELETE',
			endpoint: `/api/movie-list/${movieListId}`
		});
	} catch (e) {
		console.log(e.message);
	}
}

function* watchSaveMovieList() {
	yield takeEvery(SAVE_MOVIE_LIST, saveMovieList);
}

function* watchFetchListsPreview() {
	yield takeEvery(FETCH_MOVIE_LISTS_PREVIEW, fetchMovieListsPreview);
}

function* watchDeleteMovieList() {
	yield takeEvery(DELETE_MOVIE_LIST, deleteMovieList);
}

export default function* profile() {
	yield all([
		watchSaveMovieList(),
		watchFetchListsPreview(),
		watchDeleteMovieList()
	]);
}
