import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	GET_USER_EVENTS,
	GET_USER_EVENTS_SUCCESS,
	START_UPLOAD_USER_EVENTS,
	FINISH_UPLOAD_USER_EVENTS
} from './actionsTypes';
import config from '../../../config';
import webApi from '../../../services/webApi.service';

export function* fetchEvents(action) {
	try {
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/event/visitor/' + action.payload.id,
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

export function* saveEvent(action) {
	try {
		console.log('hee', action.payload.event);
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/event',
			method: 'Post',
			body: action.payload.event
		});

		yield put({
			type: FINISH_UPLOAD_USER_EVENTS,
			payload: {
				newEvent: data
			}
		});
	} catch (e) {
		console.log('Error fetch events by userId:', e.message);
	}
}

function* watchFetchEvents() {
	yield takeEvery(GET_USER_EVENTS, fetchEvents);
}

function* watchSaveEvent() {
	yield takeEvery(START_UPLOAD_USER_EVENTS, saveEvent);
}

export default function* events() {
	yield all([watchFetchEvents(), watchSaveEvent()]);
}
