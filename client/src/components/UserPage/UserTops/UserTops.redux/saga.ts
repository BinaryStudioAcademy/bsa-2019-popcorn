import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from './actionTypes';
import { uploadFile } from '../../../../services/file.service';

import config from '../../../../config';
import webApi from '../../../../services/webApi.service';

export function* uploadImage(action) {
	try {
		const data = yield call(uploadFile, action.payload.data);
		let url;
		if (data.imageUrl.indexOf('/') !== -1) url = data.imageUrl.split(`/`);
		else url = data.imageUrl.split(`\\`);
		url.shift();

		yield put({
			type: ActionTypes.SET_TOP_IMAGE,
			payload: {
				uploadUrl: config.API_URL + '/' + url.join('/'),
				topId: action.payload.topId
			}
		});
	} catch (e) {
		console.log('user page saga catch: uploadAvatar', e.message);
	}
}

function* watchUploadImage() {
	yield takeEvery(ActionTypes.START_UPLOAD_TOP_IMAGE, uploadImage);
}

export function* fetchElasticSearchFilms(action) {
	try {
		const data = yield call(webApi, {
			endpoint: `${config.API_URL}/api/movie/find?title=${action.payload.title}`,
			method: 'GET'
		});

		yield put({
			type: ActionTypes.SET_ElASTIC_MOVIE_LIST, //FINISH_SEARCH_ELASTIC_FILMS,
			payload: {
				elasticSearchMovies: data
			}
		});
	} catch (e) {
		console.log(e);
	}
}

function* watchFetchElasticSearchFilms() {
	yield takeEvery(ActionTypes.START_SEARCH_ELASTIC_FILMS, fetchElasticSearchFilms);
}

export function* fetchTops(action) {
	try {
		const { userId } = action.payload;

		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + `/api/top/user/${userId}`
		});

		yield put({
			type: ActionTypes.SET_TOPS,
			payload: {
				topList: data
			}
		});
	} catch (e) {
		console.log('feed saga fetch tops: ', e.message);
	}
}

function* watchFetchTops() {
	yield takeEvery(ActionTypes.FETCH_TOPS, fetchTops);
}

export function* addTop(action) {
	try {
		const { newTop } = action.payload;
		
		const data = yield call(webApi, {
			method: 'POST',
			endpoint: config.API_URL + `/api/top/user`,
			body: {
				...newTop
			}
		});
		
		if (data) {
			yield put({
				type: ActionTypes.ADD_TOP_SUCCESS,
				payload: {
					newTop: data
				}
			});
		}
	} catch (e) {
		console.log('feed saga add top: ', e.message);
	}
}

function* watchAddTop() {
	yield takeEvery(ActionTypes.ADD_TOP, addTop);
}

export function* updateTop(action) {
	try {
		const { updatedTop } = action.payload;

		const data = yield call(webApi, {
			method: 'PUT',
			endpoint: config.API_URL + `/api/top/user`,
			body: {
				...updatedTop
			}
		});

		if (data) {
			yield put({
				type: ActionTypes.UPDATE_TOP_SUCCESS,
				payload: {
					updatedTop: data
				}
			});
		}
	} catch (e) {
		console.log('feed saga update top: ', e.message);
	}
}

function* watchUpdateTop() {
	yield takeEvery(ActionTypes.UPDATE_TOP, updateTop);
}

export function* deleteTop(action) {
	try {
		const { topId } = action.payload;

		const data = yield call(webApi, {
			method: 'DELETE',
			endpoint: config.API_URL + `/api/top/${topId}`
		});

		yield put({
			type: ActionTypes.DELETE_TOP_SUCCESS,
			payload: {
				topId
			}
		});
	} catch (e) {
		console.log('feed saga delete top: ', e.message);
	}
}

function* watchDeleteTop() {
	yield takeEvery(ActionTypes.DELETE_TOP, deleteTop);
}

export default function* profile() {
	yield all([
		watchUploadImage(),
		watchFetchElasticSearchFilms(),
		watchFetchTops(),
		watchAddTop(),
		watchUpdateTop(),
		watchDeleteTop()
	]);
}
