import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	GET_USER_EVENTS,
	GET_USER_EVENTS_SUCCESS,
	START_UPLOAD_USER_EVENTS,
	FINISH_UPLOAD_USER_EVENTS,
	DELETE_OWN_USER_EVENT,
	UPDATE_USER_EVENT
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
			type: GET_USER_EVENTS,
			payload: {
				newEvent: data,
				id: action.payload.event.userId
			}
		});
	} catch (e) {
		console.log('Error create event', e.message);
	}
}

export function* updateEvent(action) {
	try {
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/event',
			method: 'PUT',
			body: action.payload.event
		});

		yield put({
			type: GET_USER_EVENTS,
			payload: {
				// newEvent: data,
				id: action.payload.event.userId
			}
		});
	} catch (e) {
		console.log('Error update event:', e.message);
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
			payload: { id: currentUserId }
		});
	} catch (e) {
		console.log('Error delete event by ID:', e.message);
	}
}

function* watchFetchEvents() {
	yield takeEvery(GET_USER_EVENTS, fetchEvents);
}

function* watchSaveEvent() {
	yield takeEvery(START_UPLOAD_USER_EVENTS, saveEvent);
}
function* watchupdateEvent() {
	yield takeEvery(UPDATE_USER_EVENT, updateEvent);
}

function* watchDeleteEvent() {
	yield takeEvery(DELETE_OWN_USER_EVENT, deleteEvent);
}

export default function* events() {
	yield all([
		watchFetchEvents(),
		watchSaveEvent(),
		watchupdateEvent(),
		watchDeleteEvent()
	]);
}
