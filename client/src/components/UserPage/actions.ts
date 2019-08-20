import {
	CANCEL_TEMP_AVATAR,
	SET_AVATAR,
	START_UPLOAD_AVATAR,
	USER_POSTS,
	GET_SELECTED_USER_INFO
} from './actionTypes';

export const uploadAvatar = (file: FormData, id: string): any => {
	return {
		type: START_UPLOAD_AVATAR,
		payload: {
			file,
			id
		}
	};
};

export const cancelAvatar = () => {
	return {
		type: CANCEL_TEMP_AVATAR
	};
};

export const setAvatar = (url, id): any => {
	return {
		type: SET_AVATAR,
		payload: {
			url,
			id
		}
	};
};

export const getUsersPosts = (id: string): any => {
	return {
		type: USER_POSTS,
		payload: { id }
	};
};

export const getSelectedUserInfo = (id: string): any => {
	return {
		type: GET_SELECTED_USER_INFO,
		payload: {
			id
		}
	};
};
