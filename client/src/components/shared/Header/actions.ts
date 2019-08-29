import {
	START_FETCH_SEARCH_FILMS,
	SEND_TOKEN_TO_SERVER,
	GET_UNREAD_NOTIFICATIONS,
	SET_NOTIFICITATION_IS_READ
} from './actionTypes';

export const fetchFilms = (text: string) => {
	return {
		type: START_FETCH_SEARCH_FILMS,
		payload: {
			text
		}
	};
};
export const sendTokenToServer = (token: string | null): any => {
	return {
		type: SEND_TOKEN_TO_SERVER,
		payload: {
			token
		}
	};
};

export const getUnreadNotifications = (userId: string): any => {
	return {
		type: GET_UNREAD_NOTIFICATIONS,
		payload: {
			userId
		}
	};
};

export const setNotificitationIsRead = (notificationId: string): any => {
	return {
		type: SET_NOTIFICITATION_IS_READ,
		payload: {
			notificationId
		}
	};
};
