import {
	FETCH_CHATS,
	FETCH_MESSAGES,
	CREATE_CHAT,
	CREATE_MESSAGE,
	DELETE_MESSAGE
} from './actionTypes';

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

export const createChat = (user1Id, user2Id) => {
	return {
		type: CREATE_CHAT,
		payload: {
			user1Id,
			user2Id
		}
	};
};

export const createMessage = (userId, chatId, body) => {
	return {
		type: CREATE_MESSAGE,
		payload: {
			userId,
			chatId,
			body
		}
	};
};

export const deleteMessage = (id, body) => {
	return {
		type: DELETE_MESSAGE,
		payload: {
			id
		}
	};
};

export const updateMessage = (id, body) => {
	return {
		type: DELETE_MESSAGE,
		payload: {
			id,
			body
		}
	};
};
