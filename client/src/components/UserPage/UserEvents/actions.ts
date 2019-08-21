import {
	GET_USER_EVENTS,
	DELETE_OWN_USER_EVENT,
	START_UPLOAD_USER_EVENTS,
	UPDATE_USER_EVENT,
	GET_All_EVENTS,
	GET_EVENT_BY_ID
} from './actionsTypes';

export const getUserEvents = (id: string) => {
	return {
		type: GET_USER_EVENTS,
		payload: {
			id
		}
	};
};

export const saveEvent = (event: any) => {
	return {
		type: START_UPLOAD_USER_EVENTS,
		payload: {
			event
		}
	};
};

export const updateEvent = (event: any) => {
	return {
		type: UPDATE_USER_EVENT,
		payload: {
			event
		}
	};
};

export const deleteEvent = (id: string, currentUserId: string) => {
	return {
		type: DELETE_OWN_USER_EVENT,
		payload: {
			id,
			currentUserId
		}
	};
};

export const getAllEvents = () => {
	return {
		type: GET_All_EVENTS
	};
};

export const getEventById = (eventId: string) => {
	return {
		type: GET_EVENT_BY_ID,
		payload: {
			eventId
		}
	};
};
