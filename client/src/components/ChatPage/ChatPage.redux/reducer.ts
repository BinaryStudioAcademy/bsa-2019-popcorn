import {
	SET_CHATS,
	SET_MESSAGES,
	FETCH_CHATS,
	FETCH_MESSAGES,
	ADD_MESSAGE_STORE,
	DELETE_MESSAGE_STORE
} from './actionTypes';

const initialState = {
	chats: {},
	isLoadingList: false,
	isLoadingMessages: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_CHATS:
			return { ...state, isLoadingList: true };
		case SET_CHATS:
			const chats: any = {};
			action.payload.data.forEach(chat => (chats[chat.id] = chat));
			return {
				...state,
				chats: {
					...chats
				},
				isLoadingList: false
			};
		case FETCH_MESSAGES:
			return {
				...state,
				isLoadingMessages: true
			};

		case SET_MESSAGES:
			return {
				...state,
				chats: {
					...state.chats,
					[action.payload.chatId]: {
						...state.chats[action.payload.chatId],
						messages: action.payload.messages
					}
				},
				isLoadingMessages: false
			};
		case ADD_MESSAGE_STORE:
			const newMessage = action.payload.message;
			const chatId = newMessage.chat.id;
			delete newMessage.chat;

			return {
				...state,
				chats: {
					...state.chats,
					[chatId]: {
						...state.chats[chatId],
						messages: [...state.chats[chatId].messages, newMessage],
						lastMessage: newMessage
					}
				}
			};
		case DELETE_MESSAGE_STORE:
			const { chatId: chat_id, messageId } = action.payload;
			const filteredMessages = state.chats[chat_id].messages.filter(
				message => message.id !== messageId
			);

			return {
				...state,
				chats: {
					...state.chats,
					[chat_id]: {
						...state.chats[chat_id],
						messages: [...filteredMessages]
					}
				}
			};
		default:
			return state;
	}
}
