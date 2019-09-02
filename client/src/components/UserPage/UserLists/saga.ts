import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	SAVE_MOVIE_LIST,
	FETCH_MOVIE_LISTS_PREVIEW,
	FETCH_MOVIE_LISTS_PREVIEW_SUCCESS
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

function* watchSaveMovieList() {
	yield takeEvery(SAVE_MOVIE_LIST, saveMovieList);
}

function* watchFetchListsPreview() {
	yield takeEvery(FETCH_MOVIE_LISTS_PREVIEW, fetchMovieListsPreview);
}

export default function* profile() {
	yield all([watchSaveMovieList(), watchFetchListsPreview()]);
}
