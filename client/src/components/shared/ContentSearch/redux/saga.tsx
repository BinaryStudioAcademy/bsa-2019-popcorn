import { all, takeEvery, call } from '@redux-saga/core/effects';
import { CONTENT_SEARCH_FETCH_DATA } from './actionTypes';
import webApi from '../../../../services/webApi.service';

export function* fetchData(action) {
	try {
		const data = yield call(webApi, {
			endpoint: '/api/search',
			method: 'POST',
			body: {
				...action.payload
			}
		});

		console.log(data);
	} catch (e) {
		console.log('contentSearch saga: ', e.message);
	}
}

function* watchFetchData() {
	return yield takeEvery(CONTENT_SEARCH_FETCH_DATA, fetchData);
}

export default function* contentSearch() {
	yield all([watchFetchData()]);
}
