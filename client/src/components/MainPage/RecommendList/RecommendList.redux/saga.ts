import { all, call, put, takeEvery } from '@redux-saga/core/effects';

import { FETCH_RECOMMENDED, SET_RECOMMENDED } from './actionTypes';

import webApi from '../../../../services/webApi.service';

export function* fetchRecommended(action) {
	try {
		const recommended = yield call(webApi, {
			method: 'GET',
			endpoint: `api/recommended/${action.payload}`
		});
		yield put({
			type: SET_RECOMMENDED,
			payload: recommended
		});
	} catch (e) {
		console.log('fet recommended saga', e.message);
	}
}

function* watchFetchRecommended() {
	yield takeEvery(FETCH_RECOMMENDED, fetchRecommended);
}

export default function* recommendedSaga() {
	yield all([watchFetchRecommended()]);
}
