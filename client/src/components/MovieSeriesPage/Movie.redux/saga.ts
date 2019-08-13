import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	FINISH_FETCH_SEARCH_FILMS,
	START_FETCH_SEARCH_FILMS
} from '../../shared/Header/actionTypes';
import {
	START_SEARCH_ELASTIC_FILMS,
	FINISH_SEARCH_ELASTIC_FILMS
} from '../../UserPage/UserTops/actionTypes';
import webApi from '../../../services/webApi.service';
import {
	FETCH_MOVIE_LIST,
	SET_MOVIE_LIST,
	SET_ElASTIC_MOVIE_LIST
} from './actionTypes';
import config from '../../../config';

export function* fetchFilms(action) {
	try {
		let films = yield call(webApi, {
			endpoint: `${config.API_URL}/api/movie/find?title=${action.payload.text}`,
			method: 'GET'
		});

		yield put({
			type: FINISH_FETCH_SEARCH_FILMS,
			payload: {
				films
			}
		});
	} catch (e) {
		console.log(e);
		// TODO show error
	}
}

export function* fetchMovieList() {
	try {
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/movie',
			method: 'GET'
		});
		yield put({
			type: SET_MOVIE_LIST,
			payload: {
				movies: data
			}
		});
	} catch (e) {
		console.log('movie saga fetchMovieList:', e.message);
	}
}

export function* fetchElasticSearchFilms(action) {
	try {
		let response = yield call(webApi, {
			endpoint: `${config.API_URL}/api/movie/elastic?title=${action.payload.title}`,
			method: 'GET'
		});

		yield put({
			type: SET_ElASTIC_MOVIE_LIST, //FINISH_SEARCH_ELASTIC_FILMS,
			payload: {
				elasticSearchMovies: response.hits.hits
			}
		});
	} catch (e) {
		console.log(e);
		// TODO show error
	}
}

function* watchFetchFilms() {
	yield takeEvery(START_FETCH_SEARCH_FILMS, fetchFilms);
}

function* watchFetchMovieList() {
	yield takeEvery(FETCH_MOVIE_LIST, fetchMovieList);
}

function* watchFetchElasticSearchFilms() {
	yield takeEvery(START_SEARCH_ELASTIC_FILMS, fetchElasticSearchFilms);
}

export default function* header() {
	yield all([
		watchFetchFilms(),
		watchFetchMovieList(),
		watchFetchElasticSearchFilms()
	]);
}
