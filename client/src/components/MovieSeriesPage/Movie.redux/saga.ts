import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	FINISH_FETCH_SEARCH_FILMS,
	START_FETCH_SEARCH_FILMS
} from '../../shared/Header/actionTypes';
import webApi from '../../../services/webApi.service';
import {
	FETCH_FILTRED_MOVIES,
	FETCH_MOVIE_BY_ID,
	FETCH_MOVIE_BY_ID_SUCCESS,
	FETCH_MOVIE_LIST,
	FETCH_REVIEW_BY_USER_MOVIE_ID,
	FETCH_REVIEW_BY_USER_MOVIE_ID_SUCCESS,
	FETCH_SEARCH,
	FETCH_SEARCH_TO_ADD_MOVIE,
	GET_AWARDS,
	LOAD_MORE_FILTRED_MOVIE,
	LOAD_MORE_MOVIE,
	LOADING,
	SET_AWARDS,
	SET_FILTRED_MOVIE_LIST,
	SET_LOAD_MORE_FILTRED_MOVIE,
	SET_LOAD_MORE_MOVIE,
	SET_MOVIE_LIST,
	SET_REVIEW,
	SET_REVIEW_SUCCESS,
	SET_SEARCH_MOVIE,
	SET_SEARCH_MOVIE_TO_ADD,
	SET_SHOW_SPINNER,
	SET_HIDE_SPINNER,
	GET_GENRES,
	SET_GENRES,
	FETCH_STATISTICS,
	FETCH_STATISTICS_SUCCESS,
	FETCH_POSTS_BY_FILM_SUCCESS,
	FETCH_POSTS_BY_FILM
} from './actionTypes';
import { FETCH_MOVIE_REVIEWS } from '../MovieSeriesReviews/actionTypes';

export function* fetchFilms(action) {
	try {
		let films = yield call(webApi, {
			endpoint: `/api/movie/find?title=${action.payload.text}`,
			method: 'GET'
		});
		console.log('da1', films);
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

export function* fetchFiltredMovieList(action) {
	try {
		yield put({
			type: SET_SHOW_SPINNER
		});

		const data = yield call(webApi, {
			endpoint: '/api/movie/advanced',
			method: 'POST',
			body: action.payload
		});
		yield put({
			type: SET_FILTRED_MOVIE_LIST,
			payload: {
				movies: data
			}
		});

		yield put({
			type: SET_HIDE_SPINNER
		});
	} catch (e) {
		console.log('movie saga fetchMovieList:', e.message);
		yield put({
			type: SET_FILTRED_MOVIE_LIST,
			payload: {
				movies: null
			}
		});
	}
}

export function* getGenres() {
	const genres = yield call(webApi, {
		method: 'GET',
		endpoint: '/api/movie/advanced/get-genres'
	});
	yield put({
		type: SET_GENRES,
		payload: {
			genres
		}
	});
}

export function* fetchAwards(action) {
	const awards = yield call(webApi, {
		method: 'GET',
		endpoint: '/api/movie/awards/' + action.payload.id
	});
	yield put({
		type: SET_AWARDS,
		payload: {
			awards
		}
	});
}

export function* fetchMovieList() {
	try {
		let data = yield call(webApi, {
			endpoint: `/api/movie`,
			method: 'GET',
			parse: false
		});

		data = yield call(data.json.bind(data));

		yield put({
			type: SET_MOVIE_LIST,
			payload: {
				movies: data
			}
		});
	} catch (e) {
		console.log('movie saga fetchMovieList:', e);
	}
}

export function* fetchMovie(action) {
	const { movieId } = action.payload;
	try {
		const data = yield call(webApi, {
			endpoint: `/api/movie/${movieId}`,
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

export function* fetchSearch(action) {
	try {
		yield put({
			type: LOADING,
			payload: { loading: true }
		});
		let movies = yield call(webApi, {
			endpoint: `/api/movie/find?title=${action.payload.title}`,
			method: 'GET'
		});
		yield put({
			type: LOADING,
			payload: { loading: false }
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

export function* fetchSearchMovie(action) {
	try {
		yield put({
			type: LOADING,
			payload: { loading: true }
		});
		let movies = yield call(webApi, {
			endpoint: `/api/movie/find?title=${action.payload.title}`,
			method: 'GET'
		});
		yield put({
			type: LOADING,
			payload: { loading: false }
		});
		yield put({
			type: SET_SEARCH_MOVIE_TO_ADD,
			payload: {
				movies,
				searchTitle: action.payload.title
			}
		});
	} catch (e) {
		console.log('movie saga fetchSearchMovie: ', e.message);
	}
}

export function* loadMoreMovie(action) {
	const { size, from } = action.payload;
	try {
		let data = yield call(webApi, {
			endpoint: `/api/movie?from=${from}&size=${size}`,
			method: 'GET',
			parse: false
		});

		data = yield data.json();

		yield put({
			type: SET_LOAD_MORE_MOVIE,
			payload: {
				movies: data
			}
		});
	} catch (e) {
		console.log('movie saga loadMoreMovie: ', e.message);
	}
}

export function* loadMoreFiltredMovie(action) {
	const { size, from, filters } = action.payload;
	try {
		yield put({
			type: SET_SHOW_SPINNER
		});
		const data = yield call(webApi, {
			endpoint: `/api/movie/advanced?from=${from}&size=${size}`,
			method: 'POST',
			body: filters
		});
		yield put({
			type: SET_LOAD_MORE_FILTRED_MOVIE,
			payload: {
				movies: data
			}
		});
		yield put({
			type: SET_HIDE_SPINNER
		});
	} catch (e) {
		console.log('movie saga loadMoreFiltredMovie: ', e.message);
	}
}

export function* fetchReviewByUserMovieId(action) {
	const { userId, movieId } = action.payload;
	try {
		const data = yield call(webApi, {
			endpoint: `/api/review/${userId}/${movieId}`,
			method: 'GET'
		});

		yield put({
			type: FETCH_REVIEW_BY_USER_MOVIE_ID_SUCCESS,
			payload: {
				review: data
			}
		});
	} catch (error) {
		console.log(error);
	}
}

export function* setReview(action) {
	const { userId, movieId, text, prevId } = action.payload;
	try {
		if (prevId) {
			yield call(webApi, {
				endpoint: `/api/review/${prevId}`,
				method: 'PUT',
				body: {
					text
				}
			});
		} else {
			yield call(webApi, {
				endpoint: `/api/review`,
				method: 'POST',
				body: {
					userId,
					movieId,
					text
				}
			});
		}

		yield put({
			type: SET_REVIEW_SUCCESS
		});

		yield put({
			type: FETCH_MOVIE_REVIEWS,
			payload: { movieId }
		});
	} catch (error) {
		console.log(error);
	}
}

export function* fetchStatistics(action) {
	const { movieId } = action.payload;
	try {
		const statistics = yield call(webApi, {
			endpoint: `/api/movie/${movieId}/statistics`,
			method: 'GET'
		});

		yield put({
			type: FETCH_STATISTICS_SUCCESS,
			payload: {
				statistics
			}
		});
	} catch (error) {
		console.log(error);
	}
}

export function* fetchPosts(action) {
	const { movieId } = action.payload;
	try {
		const posts = yield call(webApi, {
			endpoint: `/api/movie/${movieId}/posts`,
			method: 'GET'
		});

		yield put({
			type: FETCH_POSTS_BY_FILM_SUCCESS,
			payload: {
				posts
			}
		});
	} catch (error) {
		console.log(error);
	}
}

function* watchFetchFiltredMovieList() {
	yield takeEvery(FETCH_FILTRED_MOVIES, fetchFiltredMovieList);
}

function* watchFetchFilms() {
	yield takeEvery(START_FETCH_SEARCH_FILMS, fetchFilms);
}

function* watchFetchMovieList() {
	yield takeEvery(FETCH_MOVIE_LIST, fetchMovieList);
}

function* watchFetchSearch() {
	yield takeEvery(FETCH_SEARCH, fetchSearch);
}

function* watchFetchSearchMovie() {
	yield takeEvery(FETCH_SEARCH_TO_ADD_MOVIE, fetchSearchMovie);
}

function* watchFetchMovie() {
	yield takeEvery(FETCH_MOVIE_BY_ID, fetchMovie);
}

function* watchFetchAwards() {
	yield takeEvery(GET_AWARDS, fetchAwards);
}

function* watchLoadMoreMovie() {
	yield takeEvery(LOAD_MORE_MOVIE, loadMoreMovie);
}

function* watchLoadMoreFiltredMovie() {
	yield takeEvery(LOAD_MORE_FILTRED_MOVIE, loadMoreFiltredMovie);
}

function* watchFetchReviewByUserMovieId() {
	yield takeEvery(FETCH_REVIEW_BY_USER_MOVIE_ID, fetchReviewByUserMovieId);
}

function* watchSetReview() {
	yield takeEvery(SET_REVIEW, setReview);
}

function* watchFetchGenres() {
	yield takeEvery(GET_GENRES, getGenres);
}

function* watchFetchStatistics() {
	yield takeEvery(FETCH_STATISTICS, fetchStatistics);
}

function* watchFetchPosts() {
	yield takeEvery(FETCH_POSTS_BY_FILM, fetchPosts);
}
export default function* header() {
	yield all([
		watchFetchFilms(),
		watchFetchMovieList(),
		watchFetchMovie(),
		watchFetchSearch(),
		watchFetchSearchMovie(),
		watchLoadMoreMovie(),
		watchFetchReviewByUserMovieId(),
		watchSetReview(),
		watchFetchAwards(),
		watchFetchFiltredMovieList(),
		watchLoadMoreFiltredMovie(),
		watchFetchGenres(),
		watchFetchStatistics(),
		watchFetchPosts()
	]);
}
