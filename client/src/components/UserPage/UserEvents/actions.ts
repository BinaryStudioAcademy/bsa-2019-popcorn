import { GET_USER_EVENTS, START_UPLOAD_USER_EVENTS } from './actionsTypes';
import { IEvent } from './UserEvents';

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
