import { GET_USER_EVENTS_SUCCESS } from './actionsTypes';

export default (state = [], action) => {
	switch (action.type) {
		case GET_USER_EVENTS_SUCCESS:
			return {
				...state,
				userEvents: action.payload.userEvents
			};
		default:
			return state;
	}
};
