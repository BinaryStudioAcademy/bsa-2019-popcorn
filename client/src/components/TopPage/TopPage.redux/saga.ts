import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from './actionTypes';

import config from '../../../config';
import webApi from '../../../services/webApi.service';

export function* fetchTop(action) {
	try {
		const { topId } = action.payload;

		const top = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + `/api/top/${topId}`
		});

		yield put({
			type: ActionTypes.SET_TOP,
			payload: {
				top
			}
		});
	} catch (e) {
		console.log('feed saga fetch top: ', e.message);
	}
}

function* watchFetchTop() {
	yield takeEvery(ActionTypes.FETCH_TOP, fetchTop);
}

export default function* top() {
	yield all([
		watchFetchTop()
	]);
}
