import { all, call, put, takeEvery } from 'redux-saga/effects';
import webApi from '../../../services/webApi.service';
import { SEARCH_MOVIE_TITLE, SEARCH_MOVIE_TITLE_SUCCESS } from './actionTypes';

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

function* watchserchMovieTitle() {
	yield takeEvery(SEARCH_MOVIE_TITLE, serchMovieTitle);
}

export default function* searchMovie() {
	yield all([watchserchMovieTitle()]);
}
