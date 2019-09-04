import {
	START_FETCH_SEARCH_FILMS,
	SEND_TOKEN_TO_SERVER,
	GET_UNREAD_NOTIFICATIONS,
	SET_NOTIFICATION_IS_READ,
	GET_FIREBASE_TOKEN,
	DELETE_FIREBASE_TOKEN
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

export const setNotificationIsRead = (notificationId: string): any => {
	return {
		type: SET_NOTIFICATION_IS_READ,
		payload: {
			notificationId
		}
	};
};

export const getFirebaseToken = (firebase: any) => {
	return {
		type: GET_FIREBASE_TOKEN,
		payload: {
			firebase
		}
	};
};
export const deleteFirebaseToken = (firebaseToken: string) => {
	return {
		type: DELETE_FIREBASE_TOKEN,
		payload: {
			firebaseToken
		}
	};
};
