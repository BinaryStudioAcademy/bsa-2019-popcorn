import { GET_UNREAD_NOTIFICATIONS_SUCCESS } from './actionTypes';

const initialState = {
	unreadNotifications: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_UNREAD_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				unreadNotifications: action.payload.unreadNotifications
			};
		default:
			return state;
	}
};
