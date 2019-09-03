import {
	SET_CHATS,
	SET_MESSAGES,
	FETCH_CHATS,
	FETCH_MESSAGES,
	ADD_MESSAGE_STORE,
	DELETE_MESSAGE_STORE,
	UPDATE_MESSAGE_STORE,
	READ_MESSAGES,
	ADD_UNREAD_MESSAGE
} from './actionTypes';

const initialState: {
	chats: any;
	// unreadMessages: Array<{
	// 	chatId: string,
	// 	unreadMessagesCount: number
	// }>;
	isLoadingList: boolean;
	isLoadingMessages: boolean;
} = {
	chats: {},
	// unreadMessages: [],
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
		case ADD_UNREAD_MESSAGE:
			return {
				...state,
				chats: {
					...state.chats,
					[action.payload.chatId]: {
						...state.chats[action.payload.chatId],

						unreadMessagesCount:
							state.chats[action.payload.chatId].unreadMessagesCount + 1
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
		case UPDATE_MESSAGE_STORE:
			const { chatId: id, message } = action.payload;
			const updatedMessages = state.chats[id].messages.map(mes =>
				mes.id === message.id ? message : mes
			);

			return {
				...state,
				chats: {
					...state.chats,
					[id]: {
						...state.chats[id],
						messages: [...updatedMessages]
					}
				}
			};
		case READ_MESSAGES:
			const { chatId: id_chat, userId } = action.payload;
			const filteredUnreadMessages = state.chats[id_chat].unreadMessages.filter(
				message => message.chatId !== id_chat && message.user.id === userId
			);
			return {
				...state,
				chats: {
					...state.chats,
					[id_chat]: {
						...state.chats[id_chat],
						unreadMessages: [...filteredUnreadMessages]
					}
				}
			};

		default:
			return state;
	}
}
