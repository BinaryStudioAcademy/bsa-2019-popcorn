import { GET_USER_EVENTS, DELETE_OWN_USER_EVENT } from './actionsTypes';

export const getUserEvents = (id: string) => {
	return {
		type: GET_USER_EVENTS,
		payload: id
	};
};

export const deleteEvent = (id: string, currentUserId: string) => {
	console.log('Удаляем шляпу');
	return {
		type: DELETE_OWN_USER_EVENT,
		payload: {
			id,
			currentUserId
		}
	};
};
