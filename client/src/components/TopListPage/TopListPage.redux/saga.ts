import { all, call, put, takeEvery } from '@redux-saga/core/effects';
import { FETCH_TOPS, SET_TOPLIST } from './actionTypes';

import webApi from '../../../services/webApi.service';
import config from '../../../config';

export function* fetchTops(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/top/extended'
		});

		yield put({
			type: SET_TOPLIST,
			payload: {
				tops: data
			}
		});
	} catch (e) {
		console.log('top list saga fetch tops: ', e.message);
	}
}

function* watchFetchTops() {
	yield takeEvery(FETCH_TOPS, fetchTops);
}

export default function* topList() {
	yield all([watchFetchTops()]);
}
