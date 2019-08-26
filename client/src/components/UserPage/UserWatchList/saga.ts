import { all, call, put, takeEvery } from 'redux-saga/effects';
import webApi from '../../../services/webApi.service';
import {
	FETCH_USER_WATCH_LIST,
	FETCH_USER_WATCH_LIST_SUCCESS
} from './actionTypes';

export function* fetchWatchList() {
	try {
		const watchList = yield call(webApi, {
			endpoint: `/api/watch`,
			method: 'GET'
		});

		yield put({
			type: FETCH_USER_WATCH_LIST_SUCCESS,
			payload: { watchList }
		});
	} catch (error) {
		console.log(error);
	}
}

function* watchFetchWatchList() {
	yield takeEvery(FETCH_USER_WATCH_LIST, fetchWatchList);
}

export default function* watchList() {
	yield all([watchFetchWatchList()]);
}
