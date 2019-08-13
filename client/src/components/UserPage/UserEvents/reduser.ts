import { GET_USER_EVENTS_SUCCESS } from './actionsTypes';

const initialState = {
	id: 'undefined'
};

export default (state = initialState, action) => {
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
