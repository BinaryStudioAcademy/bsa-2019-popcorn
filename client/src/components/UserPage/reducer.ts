import {
	CANCEL_TEMP_AVATAR,
	FINISH_UPLOAD_AVATAR,
	SET_TEMP_AVATAR,
	SET_USER_POSTS
} from './actionTypes';
import {
	LOGIN,
	RESET_ERROR,
	RESET_OK,
	RESTORE_ERROR,
	RESTORE_OK,
	SET_LOGIN_ERROR,
	SET_REGISTER_ERROR
} from '../authorization/actionTypes';

const initialState = {
	profileInfo: null,
	uploadUrl: '',
	userPosts: null,
	loginError: null,
	registerError: null,
	resetMessage: '',
	restoreMessage: ''
};

const ok_message = 'Check your email';
const restore_ok_message = 'Your password has been changed';

export default function(state = initialState, action) {
	switch (action.type) {
		case FINISH_UPLOAD_AVATAR:
			return {
				...state,
				profileInfo: action.payload.user,
				uploadUrl: ''
			};
		case SET_TEMP_AVATAR: {
			return {
				...state,
				uploadUrl: action.payload.uploadUrl
			};
		}
		case CANCEL_TEMP_AVATAR: {
			return {
				...state,
				uploadUrl: ''
			};
		}
		case LOGIN:
			return {
				...state,
				profileInfo: action.payload.user
			};
		case SET_USER_POSTS:
			return {
				...state,
				userPosts: action.payload.userPosts
			};
		case SET_LOGIN_ERROR:
			return {
				...state,
				loginError: action.payload.loginError
			};
		case SET_REGISTER_ERROR:
			return {
				...state,
				registerError: action.payload.registerError
			};
		case RESET_OK:
			return {
				...state,
				resetMessage: ok_message
			};
		case RESET_ERROR:
			return {
				...state,
				resetMessage: action.payload.message
			};
		case RESTORE_OK:
			return {
				...state,
				restoreMessage: restore_ok_message
			};
		case RESTORE_ERROR:
			return {
				...state,
				restoreMessage: action.payload.message
			};
		default:
			return state;
	}
}
