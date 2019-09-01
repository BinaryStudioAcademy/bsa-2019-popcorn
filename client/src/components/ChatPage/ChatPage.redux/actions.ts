import { FETCH_CHATS, FETCH_MESSAGES } from './actionTypes';

export const fetchChats = userId => {
	return {
		type: FETCH_CHATS,
		payload: {
			userId
		}
	};
};

export const fetchMessages = (userId, chatId) => {
	return {
		type: FETCH_MESSAGES,
		payload: {
			userId,
			chatId
		}
	};
};
