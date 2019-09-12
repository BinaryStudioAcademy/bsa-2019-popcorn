import {
	CANCEL_TEMP_AVATAR,
	FINISH_UPLOAD_AVATAR,
	SET_TEMP_AVATAR,
	SET_USER_POSTS,
	SET_SELECTED_USER,
	SAVE_CROPPED
} from './actionTypes';
import {
	LOGIN,
	LOGOUT,
	RESET_ERROR,
	RESET_OK,
	RESTORE_ERROR,
	RESTORE_OK,
	SET_LOGIN_ERROR,
	SET_REGISTER_ERROR,
	FETCH_REGISTRATION
} from '../authorization/actionTypes';

import { fetchUser } from '../../redux/routines';
import {
	ADD_NEW_REACTION,
	ADD_NEW_COMMENT
} from '../MainPage/FeedBlock/FeedBlock.redux/actionTypes';
import findIndexInArray from '../../helpers/findIndexInArray';

const initialState = {
	profileInfo: null,
	uploadUrl: '',
	userPosts: null,
	loginError: null,
	registerError: null,
	resetMessage: '',
	restoreMessage: '',
	loading: false,
	error: null,
	selectedProfileInfo: null,
	croppedSaved: false,
	userAvatar: ''
};

const ok_message = 'Check your email';
const restore_ok_message = 'Your password has been changed';

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_SELECTED_USER:
			return {
				...state,
				userPosts: null,
				selectedProfileInfo: action.payload.user.user
			};
		case FINISH_UPLOAD_AVATAR:
			return {
				...state,
				profileInfo: action.payload.user,
				selectedProfileInfo: action.payload.user,
				uploadUrl: '',
				croppedSaved: false
			};
		case SET_TEMP_AVATAR: {
			return {
				...state,
				uploadUrl: action.payload.uploadUrl
			};
		}
		case SAVE_CROPPED:
			return {
				...state,
				croppedSaved: true
			};
		case CANCEL_TEMP_AVATAR: {
			return {
				...state,
				uploadUrl: '',
				croppedSaved: false
			};
		}
		case LOGIN:
			return {
				...state,
				profileInfo: action.payload.user
			};
		case LOGOUT:
			return {
				...state,
				profileInfo: null,
				userPosts: null
			};
		case SET_USER_POSTS:
			return {
				...state,
				userPosts: action.payload.userPosts,
				loading: action.payload.loading
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
		case fetchUser.TRIGGER:
			return {
				...state,
				loading: true
			};
		case fetchUser.SUCCESS:
			return {
				...state,
				profileInfo: action.payload.data.user
			};
		case fetchUser.FAILURE:
			return {
				...state,
				error: action.payload.erorr
			};
		case fetchUser.FULFILL:
			return {
				...state,
				loading: false
			};
		case ADD_NEW_COMMENT:
			if (!state.userPosts) return state;
			const posts = state.userPosts || new Array();
			const comment = action.payload.comment.comment;

			const index = findIndexInArray(posts, 'id', comment.post.id);
			if (index === -1) {
				return state;
			}
			const post = posts[index];
			if (!post.comments) post.comments = [comment];
			else post.comments.push(comment);
			return {
				...state,
				userPosts: [...posts]
			};
		case ADD_NEW_REACTION:
			if (!state.userPosts) return state;
			const postsForNewReact = state.userPosts || new Array();
			const { reactions, postId } = action.payload;

			const i = findIndexInArray(postsForNewReact, 'id', postId);
			if (i === -1) {
				return state;
			}
			const postForNewReact = postsForNewReact[i];
			postForNewReact.reactions = [...reactions];

			return {
				...state,
				userPosts: [...postsForNewReact]
			};
		case FETCH_REGISTRATION:
			return {
				...state,
				registerError: null
			};

		default:
			return state;
	}
}
