import {
	GET_UNREAD_NOTIFICATIONS_SUCCESS,
	GET_FIREBASE_TOKEN_SUCCESS,
	SET_FIREBASE_TOKEN_UNDEFINED
} from './actionTypes';

const initialState = {
	unreadNotifications: [],
	firebaseToken: undefined
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_UNREAD_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				unreadNotifications: action.payload.unreadNotifications
			};
		case GET_FIREBASE_TOKEN_SUCCESS:
			return {
				...state,
				firebaseToken: action.payload.firebaseToken
			};
		case SET_FIREBASE_TOKEN_UNDEFINED:
			return {
				...state,
				firebaseToken: undefined
			};
		default:
			return state;
	}
};
