import {
	GET_USER_EVENTS_SUCCESS,
	FINISH_UPLOAD_USER_EVENTS,
	GET_ALL_EVENTS_SUCCESS,
	GET_EVENT_BY_ID_SUCCESS
} from './actionsTypes';

const initialState = {
	userEvents: [],
	allEvents: [],
	searchedEvent: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_EVENTS_SUCCESS:
			return {
				...state,
				userEvents: action.payload.userEvents
			};
		case FINISH_UPLOAD_USER_EVENTS:
			const newEvent = action.payload.newEvent;
			return {
				...state,
				userEvents: [...state.userEvents, newEvent]
			};
		case GET_ALL_EVENTS_SUCCESS:
			return {
				...state,
				allEvents: action.payload.allEvents
			};
		case GET_EVENT_BY_ID_SUCCESS:
			return {
				...state,
				searchedEvent: action.payload.searchedEvent
			};
		default:
			return state;
	}
};
