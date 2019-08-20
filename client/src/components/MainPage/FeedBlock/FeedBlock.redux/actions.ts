import { FETCH_POSTS, CREATE_COMMENT, ADD_NEW_COMMENT } from './actionTypes';
import IComment from '../../Post/IComment';

export const fetchPosts = () => {
	return {
		type: FETCH_POSTS
	};
};

export const createComment = (userId: string, text: string, postId: string) => {
	return {
		type: CREATE_COMMENT,
		payload: {
			userId,
			text,
			postId
		}
	};
};

export const addNewComment = (comment: IComment) => {
	return {
		type: ADD_NEW_COMMENT,
		payload: {
			comment
		}
	};
};
