import { all, call, put, takeEvery } from '@redux-saga/core/effects';
import webApi from '../../../services/webApi.service';
import {
	SEND_TOKEN_TO_SERVER,
	GET_UNREAD_NOTIFICATIONS_SUCCESS,
	GET_UNREAD_NOTIFICATIONS,
	SET_NOTIFICATION_IS_READ,
	GET_FIREBASE_TOKEN,
	GET_FIREBASE_TOKEN_SUCCESS,
	DELETE_FIREBASE_TOKEN,
	SET_FIREBASE_TOKEN_UNDEFINED
} from './actionTypes';
export function* sendTokenToServer(action) {
	try {
		const response = yield call(webApi, {
			method: 'PUT',
			endpoint: '/api/notification',
			body: {
				type: 'web',
				token: action.payload.token
			}
		});
	} catch (e) {
		console.log('firebase saga sendTokenToServer: ', e);
	}
}

export function* getUnreadNotifications(action) {
	try {
		const userId = action.payload.userId;
		const unreadNotifications = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/notification/${userId}`
		});

		yield put({
			type: GET_UNREAD_NOTIFICATIONS_SUCCESS,
			payload: { unreadNotifications }
		});
	} catch (e) {
		console.log('notification saga getUnreadNotifications: ', e.message);
	}
}

export function* setNotificationIsRead(action) {
	try {
		const notificationId = action.payload.notificationId;
		const response = yield call(webApi, {
			method: 'DELETE',
			endpoint: `/api/notification/${notificationId}`
		});
	} catch (e) {
		console.log('notification saga setNotificationIsRead: ', e.message);
	}
}

export function* getFirebaseToken(action) {
	try {
		const firebase = action.payload.firebase;
		const firebaseToken = yield firebase.messaging.getToken();
		yield put({
			type: GET_FIREBASE_TOKEN_SUCCESS,
			payload: { firebaseToken }
		});
		yield put({
			type: SEND_TOKEN_TO_SERVER,
			payload: { token: firebaseToken }
		});
	} catch (e) {
		yield put({
			type: GET_FIREBASE_TOKEN_SUCCESS,
			payload: { firebaseToken: null }
		});
		console.log('notification saga getFirebaseToken: ', e.message);
	}
}

export function* deleteFirebaseToken(action) {
	try {
		if (action.payload && action.payload.firebaseToken) {
			yield call(webApi, {
				method: 'DELETE',
				endpoint: `/api/notification/token/${action.payload.firebaseToken}`
			});
			yield put({
				type: SET_FIREBASE_TOKEN_UNDEFINED
			});
		}
	} catch (e) {
		yield put({
			type: GET_FIREBASE_TOKEN_SUCCESS,
			payload: { firebaseToken: null }
		});
		console.log('notification saga getFirebaseToken: ', e.message);
	}
}

function* watchSendTokenToServer() {
	yield takeEvery(SEND_TOKEN_TO_SERVER, sendTokenToServer);
}
function* watchGetUnreadNotifications() {
	yield takeEvery(GET_UNREAD_NOTIFICATIONS, getUnreadNotifications);
}
function* watchSetNotificationIsRead() {
	yield takeEvery(SET_NOTIFICATION_IS_READ, setNotificationIsRead);
}
function* watchGetFirebaseToken() {
	yield takeEvery(GET_FIREBASE_TOKEN, getFirebaseToken);
}
function* watchDeleteFirebaseToken() {
	yield takeEvery(DELETE_FIREBASE_TOKEN, deleteFirebaseToken);
}

export default function* notification() {
	yield all([
		watchSendTokenToServer(),
		watchGetUnreadNotifications(),
		watchSetNotificationIsRead(),
		watchGetFirebaseToken(),
		watchDeleteFirebaseToken()
	]);
}
