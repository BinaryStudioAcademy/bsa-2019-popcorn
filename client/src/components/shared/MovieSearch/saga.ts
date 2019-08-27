import { all, call, put, takeEvery } from 'redux-saga/effects';
import webApi from '../../../services/webApi.service';
import {
	SEARCH_MOVIE_TITLE,
	SEARCH_MOVIE_TITLE_SUCCESS,
	FETCH_MOVIE_PROPERTIES
} from './actionTypes';

export function* serchMovieTitle(action) {
	const { inputData } = action.payload;
	try {
		const searchData = yield call(webApi, {
			endpoint: `/api/movie/search/title?title=${inputData}`,
			method: 'GET'
		});

		yield put({
			type: SEARCH_MOVIE_TITLE_SUCCESS,
			payload: { searchData }
		});
	} catch (e) {
		console.log(e);
	}
}

export function* fetchMovieProperties(action) {
	const { movieId, properties } = action.payload;
	const stringProp = properties.join(';');
	try {
		const movie = yield call(webApi, {
			endpoint: `/api/movie/properties?id=${movieId}?property=${stringProp}`,
			method: 'GET'
		});
		console.log(movie);
	} catch (e) {
		console.log(e);
	}
}

function* watchserchMovieTitle() {
	yield takeEvery(SEARCH_MOVIE_TITLE, serchMovieTitle);
}

function* watchFetchMovieProperties() {
	yield takeEvery(FETCH_MOVIE_PROPERTIES, fetchMovieProperties);
}

export default function* searchMovie() {
	yield all([watchserchMovieTitle(), watchFetchMovieProperties()]);
}
