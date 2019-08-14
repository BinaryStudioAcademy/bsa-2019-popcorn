import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	GET_USER_EVENTS,
	GET_USER_EVENTS_SUCCESS,
	DELETE_OWN_USER_EVENT
} from './actionsTypes';
import { getUserEvents } from '../UserEvents/actions';
import config from '../../../config';
import webApi from '../../../services/webApi.service';

export function* fetchEvents(action) {
	try {
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/event/visitor/' + action.payload,
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

export function* deleteEvent(action) {
	const { id, currentUserId } = action.payload;
	try {
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/event/' + id,
			method: 'DELETE'
		});

		yield put({
			type: GET_USER_EVENTS,
			payload: currentUserId
		});
	} catch (e) {
		console.log('Error delete event by ID:', e.message);
	}
}

function* watchFetchEvents() {
	yield takeEvery(GET_USER_EVENTS, fetchEvents);
}

function* watchDeleteEvent() {
	yield takeEvery(DELETE_OWN_USER_EVENT, deleteEvent);
}

export default function* events() {
	yield all([watchFetchEvents(), watchDeleteEvent()]);
}
