import { SET_CHATS, SET_MESSAGES } from './actionTypes';

const initialState = {
	chats: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CHATS:
			return {
				...state,
				chats: {
					...state.chats,
					[action.payload.chatId]: {
						...action.payload.data
					}
				}
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
				}
			};
		default:
			return state;
	}
}
