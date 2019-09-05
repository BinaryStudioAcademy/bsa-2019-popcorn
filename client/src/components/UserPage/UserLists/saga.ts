import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	SAVE_MOVIE_LIST,
	FETCH_MOVIE_LISTS_PREVIEW,
	FETCH_MOVIE_LISTS_PREVIEW_SUCCESS,
	DELETE_MOVIE_LIST,
	SAVE_MOVIE_LIST_SUCCESS,
	FETCH_MOVIE_LIST_DETAILS,
	FETCH_MOVIE_LIST_DETAILS_SUCCESS
} from './actionTypes';
import webApi from '../../../services/webApi.service';

export function* saveMovieList(action) {
	const { movieList } = action.payload;
	try {
		const newMovieList = yield call(webApi, {
			method: 'POST',
			endpoint: '/api/movie-list',
			body: { ...movieList }
		});

		yield put({
			type: SAVE_MOVIE_LIST_SUCCESS,
			payload: { newMovieList }
		});
	} catch (e) {
		console.log(e.message);
	}
}

export function* fetchMovieListsPreview(action) {
	const { userId } = action.payload;
	try {
		const movieListsPreview = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/movie-list/${userId}`
		});

		yield put({
			type: FETCH_MOVIE_LISTS_PREVIEW_SUCCESS,
			payload: { movieListsPreview, selectedPreviewUserId: userId }
		});
	} catch (e) {
		console.log(e.message);
	}
}

export function* deleteMovieList(action) {
	const { movieListId } = action.payload;
	
	try {
		const movieListsPreview = yield call(webApi, {
			method: 'DELETE',
			endpoint: `/api/movie-list/${movieListId}`
		});
	} catch (e) {
		console.log(e.message);
	}
}

export function* fetchMovieListDetails(action) {
	const { movieListId } = action.payload;
	try {
		const movieListDetails = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/movie-list/details/${movieListId}`
		});

		yield put({
			type: FETCH_MOVIE_LIST_DETAILS_SUCCESS,
			payload: { movieListDetails }
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

function* watchFetchMovieListDetails() {
	yield takeEvery(FETCH_MOVIE_LIST_DETAILS, fetchMovieListDetails);
}

export default function* profile() {
	yield all([
		watchSaveMovieList(),
		watchFetchListsPreview(),
		watchDeleteMovieList(),
		watchFetchMovieListDetails()
	]);
}
