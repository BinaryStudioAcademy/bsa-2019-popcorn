import { GET_USER_EVENTS } from './actionsTypes';

export const getUserEvents = (id: string) => {
	return {
		type: GET_USER_EVENTS,
		payload: id
	};
};
