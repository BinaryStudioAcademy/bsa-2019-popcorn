import { GET_UNREAD_NOTIFICATIONS_SUCCESS } from './actionTypes';

const initialState = {
	unredNotifications: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_UNREAD_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				unredNotifications: action.payload.unredNotifications
			};
		default:
			return state;
	}
};
