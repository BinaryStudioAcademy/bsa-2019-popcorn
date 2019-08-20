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
	SET_ElASTIC_MOVIE_LIST,
	FETCH_MOVIE_USER_RATE,
	FETCH_MOVIE_USER_RATE_SUCCESS,
	FETCH_MOVIE_BY_ID,
	FETCH_MOVIE_BY_ID_SUCCESS,
	SET_USER_RATE,
	FETCH_SEARCH,
	SET_SEARCH_MOVIE
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

export function* fetchUserRate(action) {
	const { userId, movieId } = action.payload;
	try {
		const data = yield call(webApi, {
			endpoint: config.API_URL + `/api/movie/rate/user/${userId}/${movieId}`,
			method: 'GET'
		});

		yield put({
			type: FETCH_MOVIE_USER_RATE_SUCCESS,
			payload: {
				userRate: data
			}
		});
	} catch (error) {
		console.log(error);
	}
}

export function* fetchMovie(action) {
	const { movieId } = action.payload;
	try {
		const data = yield call(webApi, {
			endpoint: config.API_URL + `/api/movie/${movieId}`,
			method: 'GET'
		});

		yield put({
			type: FETCH_MOVIE_BY_ID_SUCCESS,
			payload: {
				fetchedMovie: data
			}
		});
	} catch (error) {
		console.log(error);
	}
}

export function* setUserRate(action) {
	const { movieId, userId, rate } = action.payload;
	try {
		const data = yield call(webApi, {
			endpoint: config.API_URL + `/api/movie/rate`,
			method: 'POST',
			body: {
				userId,
				movieId,
				rate
			}
		});

		yield put({
			type: FETCH_MOVIE_BY_ID,
			payload: {
				movieId
			}
		});
		yield put({
			type: FETCH_MOVIE_USER_RATE,
			payload: {
				movieId,
				userId
			}
		});
	} catch (error) {
		console.log(error);
	}
}

export function* fetchSearch(action) {
	try {
		let movies = yield call(webApi, {
			endpoint: `${config.API_URL}/api/movie/find?title=${action.payload.title}`,
			method: 'GET'
		});
		yield put({
			type: SET_SEARCH_MOVIE,
			payload: {
				movies
			}
		});
	} catch (e) {
		console.log('movie saga fetchSearch: ', e.message);
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
function* watchFetchSearch() {
	yield takeEvery(FETCH_SEARCH, fetchSearch);
}

function* watchFetchUserRate() {
	yield takeEvery(FETCH_MOVIE_USER_RATE, fetchUserRate);
}

function* watchFetchMovie() {
	yield takeEvery(FETCH_MOVIE_BY_ID, fetchMovie);
}

function* watchSetUserRate() {
	yield takeEvery(SET_USER_RATE, setUserRate);
}

export default function* header() {
	yield all([
		watchFetchFilms(),
		watchFetchMovieList(),
		watchFetchElasticSearchFilms(),
		watchFetchUserRate(),
		watchFetchMovie(),
		watchSetUserRate(),
		watchFetchSearch()
	]);
}
