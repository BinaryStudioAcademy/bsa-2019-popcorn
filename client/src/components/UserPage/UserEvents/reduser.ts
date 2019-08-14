import {
	GET_USER_EVENTS_SUCCESS,
	FINISH_UPLOAD_USER_EVENTS
} from './actionsTypes';
import { IEvent } from './UserEvents';

const initialState = {
	userEvents: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_EVENTS_SUCCESS:
			return {
				...state,
				userEvents: action.payload.userEvents
			};
		case FINISH_UPLOAD_USER_EVENTS:
			const newEvent: IEvent = action.payload.newEvent;
			return {
				...state,
				userEvents: [...state.userEvents, newEvent]
			};
		default:
			return state;
	}
};
