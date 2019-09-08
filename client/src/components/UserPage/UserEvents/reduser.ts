import {
	GET_USER_EVENTS_SUCCESS,
	FINISH_UPLOAD_USER_EVENTS,
	GET_ALL_EVENTS_SUCCESS,
	GET_EVENT_BY_ID_SUCCESS,
	GET_USER_EVENTS,
	UPDATE_USER_EVENT
} from './actionsTypes';

const initialState = {
	userEvents: [],
	allEvents: [],
	searchedEvent: null,
	setSpinner: true
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_EVENTS_SUCCESS:
			return {
				...state,
				userEvents: action.payload.userEvents,
				setSpinner: false
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
		case GET_USER_EVENTS:
			return {
				...state,
				setSpinner: true
			};
		case UPDATE_USER_EVENT:
			return {
				...state,
				setSpinner: true
			};
		default:
			return state;
	}
};
