import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	SET_TOP_IMAGE,
	START_UPLOAD_TOP_IMAGE,
	SET_ElASTIC_MOVIE_LIST,
	START_SEARCH_ELASTIC_FILMS
} from './actionTypes';
import { uploadFile } from '../../../services/file.service';

import config from '../../../config';
import webApi from '../../../services/webApi.service';
export function* uploadImage(action) {
	try {
		const data = yield call(uploadFile, action.payload.data);
		let url;
		if (data.imageUrl.indexOf('/') !== -1) url = data.imageUrl.split(`/`);
		else url = data.imageUrl.split(`\\`);
		url.shift();

		yield put({
			type: SET_TOP_IMAGE,
			payload: {
				uploadUrl: config.API_URL + '/' + url.join('/'),
				topId: action.payload.topId
			}
		});
	} catch (e) {
		console.log('user page saga catch: uploadAvatar', e.message);
	}
}

export function* fetchElasticSearchFilms(action) {
	try {
		const data = yield call(webApi, {
			endpoint: `${config.API_URL}/api/movie/find?title=${action.payload.title}`,
			method: 'GET'
		});
		console.log('da', data);

		yield put({
			type: SET_ElASTIC_MOVIE_LIST, //FINISH_SEARCH_ELASTIC_FILMS,
			payload: {
				elasticSearchMovies: data
			}
		});
	} catch (e) {
		console.log(e);
		// TODO show error
	}
}

function* watchUploadImage() {
	yield takeEvery(START_UPLOAD_TOP_IMAGE, uploadImage);
}

function* watchFetchElasticSearchFilms() {
	yield takeEvery(START_SEARCH_ELASTIC_FILMS, fetchElasticSearchFilms);
}

export default function* profile() {
	yield all([watchUploadImage(), watchFetchElasticSearchFilms()]);
}
