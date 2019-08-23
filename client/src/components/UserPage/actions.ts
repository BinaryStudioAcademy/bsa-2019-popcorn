import {
	CANCEL_TEMP_AVATAR,
	SET_AVATAR,
	START_UPLOAD_AVATAR,
	USER_POSTS,
	SEND_POST,
	GET_SELECTED_USER_INFO,
	SAVE_CROPPED
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

export const saveCropped = () => {
	return {
		type: SAVE_CROPPED
	};
};

export const setPost = (data): any => {
	return {
		type: SEND_POST,
		payload: {
			data
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
