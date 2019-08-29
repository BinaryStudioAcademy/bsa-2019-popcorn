import { all, call, put, takeEvery } from '@redux-saga/core/effects';
// import { call } from 'redux-saga/effects';
import webApi from '../../../services/webApi.service';
import { SEND_TOKEN_TO_SERVER } from './actionTypes';
export function* sendTokenToServer(action) {
	try {
		console.log('there', webApi);
		const response = yield call(webApi, {
			method: 'PUT',
			endpoint: '/api/notification',
			body: {
				type: 'web',
				token: action.payload.token,
				userId: '123123'
			}
		});
	} catch (e) {
		console.log('firebase saga sendTokenToServer: ', e.message);
	}
}

function* watchSendTokenToServer() {
	yield takeEvery(SEND_TOKEN_TO_SERVER, sendTokenToServer);
}
export default function* notification() {
	yield all([watchSendTokenToServer()]);
}
