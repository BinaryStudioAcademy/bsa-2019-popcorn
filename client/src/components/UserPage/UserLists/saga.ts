import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SAVE_MOVIE_LIST } from './actionTypes';
import webApi from '../../../services/webApi.service';

export function* saveMovieList(action) {
	const { movieList } = action.payload;
	console.log(movieList);
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

function* watchSaveMovieList() {
	yield takeEvery(SAVE_MOVIE_LIST, saveMovieList);
}

export default function* profile() {
	yield all([watchSaveMovieList()]);
}
