import { all, call, put, takeEvery } from '@redux-saga/core/effects';
import webApi from '../../../services/webApi.service';
import {
	SEND_TOKEN_TO_SERVER,
	GET_UNREAD_NOTIFICATIONS_SUCCESS,
	GET_UNREAD_NOTIFICATIONS,
	SET_NOTIFICATION_IS_READ
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

function* watchSendTokenToServer() {
	yield takeEvery(SEND_TOKEN_TO_SERVER, sendTokenToServer);
}
function* watchGetUnreadNotifications() {
	yield takeEvery(GET_UNREAD_NOTIFICATIONS, getUnreadNotifications);
}
function* watchSetNotificationIsRead() {
	yield takeEvery(SET_NOTIFICATION_IS_READ, setNotificationIsRead);
}
export default function* notification() {
	yield all([
		watchSendTokenToServer(),
		watchGetUnreadNotifications(),
		watchSetNotificationIsRead()
	]);
}
