import { all, call, put, takeEvery } from 'redux-saga/effects';
import { GET_USER_EVENTS, GET_USER_EVENTS_SUCCESS } from './actionsTypes';
import axios from 'axios';
import config from '../../../config';
import webApi from '../../../services/webApi.service';

export function* fetchEvents(action) {
	try {
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/event/user/' + action.payload,
			method: 'GET'
		});

		yield put({
			type: GET_USER_EVENTS_SUCCESS,
			payload: {
				userEvents: data
			}
		});
	} catch (e) {
		console.log('Error fetch events by userId:', e.message);
	}
}

function* watchFetchEvents() {
	yield takeEvery(GET_USER_EVENTS, fetchEvents);
}

export default function* events() {
	yield all([watchFetchEvents()]);
}
