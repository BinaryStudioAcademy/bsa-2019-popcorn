import { all, call, put, takeEvery } from '@redux-saga/core/effects';
import {
	CONTENT_SEARCH_FETCH_DATA,
	CONTENT_SEARCH_SET_DATA
} from './actionTypes';
import webApi from '../../../../services/webApi.service';
import ContentSearch from '../index';

export function* fetchData(action) {
	try {
		const data = yield call(webApi, {
			endpoint: '/api/search',
			method: 'POST',
			body: {
				...action.payload
			}
		});
		
		yield put({
			type: CONTENT_SEARCH_SET_DATA,
			payload: { data, error: ContentSearch.isEmpty(data) ? 'Not found' : '' }
		});
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
