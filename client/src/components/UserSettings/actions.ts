import {
	UPDATE_NOTIFICATION_SETTINGS,
	UPDATE_PRIVACY,
	UPDATE_USER_EMAIL,
	UPDATE_USER_PASSWORD,
	DELETE_USER
} from './actionTypes';

export const updateNotficationSettings = (userId, data) => ({
	type: UPDATE_NOTIFICATION_SETTINGS,
	payload: {
		userId,
		data
	}
});

export const updatePrivacySettings = (userId, data) => ({
	type: UPDATE_PRIVACY,
	payload: {
		userId,
		data
	}
});

export const updateEmail = (userId, email) => ({
	type: UPDATE_USER_EMAIL,
	payload: {
		userId,
		email
	}
});

export const updatePassword = (userId, password) => ({
	type: UPDATE_USER_PASSWORD,
	payload: {
		userId,
		password
	}
});

export const deleteUser = userId => ({
	type: DELETE_USER,
	payload: {
		userId
	}
});
