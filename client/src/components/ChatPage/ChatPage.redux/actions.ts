import { FETCH_CHATS, FETCH_MESSAGES } from './actionTypes';

export const fetchChats = () => {
	return {
		type: FETCH_CHATS
	};
};

export const fetchMessages = chatId => {
	return {
		type: FETCH_MESSAGES,
		payload: {
			chatId
		}
	};
};
