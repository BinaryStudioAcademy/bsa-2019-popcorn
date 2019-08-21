import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	GET_USER_EVENTS,
	GET_USER_EVENTS_SUCCESS,
	START_UPLOAD_USER_EVENTS,
	FINISH_UPLOAD_USER_EVENTS,
	DELETE_OWN_USER_EVENT,
	UPDATE_USER_EVENT,
	GET_All_EVENTS,
	GET_ALL_EVENTS_SUCCESS,
	GET_EVENT_BY_ID_SUCCESS,
	GET_EVENT_BY_ID,
	SUBSCRIBE_TO_EVENT_SUCCESS,
	SUBSCRIBE_TO_EVENT
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

export function* fetchAllEvents() {
	try {
		const allEvents = yield call(webApi, {
			endpoint: config.API_URL + '/api/event',
			method: 'GET'
		});
		yield put({
			type: GET_ALL_EVENTS_SUCCESS,
			payload: {
				allEvents: allEvents
			}
		});
	} catch (e) {
		console.log('Error fetch all events :', e.message);
	}
}

export function* subscribeToEvent(action) {
	const { status, userId, eventId } = action.payload;
	try {
		const response = yield call(webApi, {
			endpoint: config.API_URL + `/api/event/visitor`,
			method: 'POST',
			body: {
				status,
				userId,
				eventId
			}
		});
		yield put({
			type: SUBSCRIBE_TO_EVENT_SUCCESS,
			payload: {
				newSubscriber: response
			}
		});
	} catch (e) {
		console.log('Error fetch all events :', e.message);
	}
}

export function* fetchEventById(action) {
	try {
		const event = yield call(webApi, {
			endpoint: config.API_URL + `/api/event/${action.payload.eventId}`,
			method: 'GET'
		});
		yield put({
			type: GET_EVENT_BY_ID_SUCCESS,
			payload: {
				searchedEvent: event
			}
		});
	} catch (e) {
		console.log('Error fetch all events :', e.message);
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

function* watchFetchAllEvents() {
	yield takeEvery(GET_All_EVENTS, fetchAllEvents);
}

function* watchFetchEventById() {
	yield takeEvery(GET_EVENT_BY_ID, fetchEventById);
}

function* watchSubscribeToEvent() {
	yield takeEvery(SUBSCRIBE_TO_EVENT, subscribeToEvent);
}

export default function* events() {
	yield all([
		watchFetchEvents(),
		watchSaveEvent(),
		watchupdateEvent(),
		watchDeleteEvent(),
		watchFetchAllEvents(),
		watchFetchEventById(),
		watchSubscribeToEvent()
	]);
}
