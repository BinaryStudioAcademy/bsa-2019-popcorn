import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	FETCH_CHATS,
	FETCH_MESSAGES,
	SET_CHATS,
	SET_MESSAGES,
	CREATE_CHAT,
	CREATE_MESSAGE,
	DELETE_MESSAGE,
	UPDATE_MESSAGE,
	READ_MESSAGES
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

export function* createChat(action) {
	try {
		const newChat = yield call(webApi, {
			method: 'POST',
			endpoint: `/api/chat/`,
			body: {
				user1Id: action.payload.user1Id,
				user2Id: action.payload.user2Id
			}
		});
		yield put({
			type: CREATE_MESSAGE,
			payload: {
				userId: action.payload.user1Id,
				chatId: newChat.chatId,
				body: { ...action.payload.newMessage }
			}
		});
	} catch (e) {
		console.log('chat saga create chat:', e.message);
	}
}

function* watchCreateChat() {
	yield takeEvery(CREATE_CHAT, createChat);
}

export function* createMessage(action) {
	try {
		yield call(webApi, {
			method: 'POST',
			endpoint: `/api/chat/${action.payload.userId}/${action.payload.chatId}`,
			body: {
				...action.payload.body
			}
		});
	} catch (e) {
		console.log('chat saga create message:', e.message);
	}
}

function* watchCreateMessage() {
	yield takeEvery(CREATE_MESSAGE, createMessage);
}

export function* deleteMessage(action) {
	try {
		yield call(webApi, {
			method: 'DELETE',
			endpoint: `/api/chat/${action.payload.id}`
		});
	} catch (e) {
		console.log('chat saga delete message:', e.message);
	}
}

function* watchDeleteMessage() {
	yield takeEvery(DELETE_MESSAGE, deleteMessage);
}

export function* updateMessage(action) {
	try {
		yield call(webApi, {
			method: 'PUT',
			endpoint: `/api/chat/${action.payload.id}`,
			body: { body: action.payload.body }
		});
	} catch (e) {
		console.log('chat saga delete message:', e.message);
	}
}

function* watchUpdateMessage() {
	yield takeEvery(UPDATE_MESSAGE, updateMessage);
}

export function* readMessages(action) {
	try {
		yield call(webApi, {
			method: 'PUT',
			endpoint: `/api/chat/${action.payload.chatId}/${action.payload.userId}/read`
		});
	} catch (e) {
		console.log('chat saga delete message:', e.message);
	}
}

function* watchReadMessages() {
	yield takeEvery(READ_MESSAGES, readMessages);
}

export default function* chat() {
	yield all([
		watchFetchChats(),
		watchFetchMessages(),
		watchCreateChat(),
		watchCreateMessage(),
		watchUpdateMessage(),
		watchDeleteMessage(),
		watchReadMessages()
	]);
}
