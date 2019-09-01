import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	FETCH_CHATS,
	FETCH_MESSAGES,
	SET_CHATS,
	SET_MESSAGES
} from './actionTypes';
import webApi from '../../../services/webApi.service';

export function* fetchChats(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/chat/${action.payload.userId}`
		});

		yield put({
			type: SET_CHATS,
			payload: {
				data
			}
		});
	} catch (e) {
		console.log('chat saga fetch chats:', e.message);
	}
}

function* watchFetchChats() {
	yield takeEvery(FETCH_CHATS, fetchChats);
}

export function* fetchMessages(action) {
	try {
		const messages = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/chat/${action.payload.userId}/${action.payload.chatId}`
		});

		yield put({
			type: SET_MESSAGES,
			payload: {
				messages,
				chatId: action.payload.chatId
			}
		});
	} catch (e) {
		console.log('chat saga fetch messages:', e.message);
	}
}

function* watchFetchMessages() {
	yield takeEvery(FETCH_MESSAGES, fetchMessages);
}

export default function* chat() {
	yield all([watchFetchChats(), watchFetchMessages()]);
}
