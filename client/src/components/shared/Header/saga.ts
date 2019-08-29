import { all, call, put, takeEvery } from '@redux-saga/core/effects';
import webApi from '../../../services/webApi.service';
import {
	SEND_TOKEN_TO_SERVER,
	GET_UNREAD_NOTIFICATIONS_SUCCESS,
	GET_UNREAD_NOTIFICATIONS,
	SET_NOTIFICITATION_IS_READ
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
		console.log('firebase saga sendTokenToServer: ', e.message);
	}
}

export function* getUnreadNotifications(action) {
	try {
		const userId = action.payload.userId;
		const unredNotifications = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/notification/${userId}`
		});

		yield put({
			type: GET_UNREAD_NOTIFICATIONS_SUCCESS,
			payload: { unredNotifications }
		});
	} catch (e) {
		console.log('notification saga getUnreadNotifications: ', e.message);
	}
}

export function* setNotificitationIsRead(action) {
	try {
		const notificationId = action.payload.notificationId;
		const response = yield call(webApi, {
			method: 'DELETE',
			endpoint: `/api/notification/${notificationId}`
		});
	} catch (e) {
		console.log('notification saga setNotificitationIsRead: ', e.message);
	}
}

function* watchSendTokenToServer() {
	yield takeEvery(SEND_TOKEN_TO_SERVER, sendTokenToServer);
}
function* watchGetUnreadNotifications() {
	yield takeEvery(GET_UNREAD_NOTIFICATIONS, getUnreadNotifications);
}
function* watchSetNotificitationIsRead() {
	yield takeEvery(SET_NOTIFICITATION_IS_READ, setNotificitationIsRead);
}
export default function* notification() {
	yield all([
		watchSendTokenToServer(),
		watchGetUnreadNotifications(),
		watchSetNotificitationIsRead()
	]);
}
