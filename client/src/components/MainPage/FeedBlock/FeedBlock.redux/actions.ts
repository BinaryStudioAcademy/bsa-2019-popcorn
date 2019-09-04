import {
	ADD_NEW_COMMENT,
	ADD_NEW_POST,
	ADD_NEW_REACTION,
	CREATE_COMMENT,
	CREATE_REACTION,
	DELETE_POST,
	DELETE_POST_FROM_LIST,
	FETCH_POSTS,
	UPDATE_POST
} from './actionTypes';
import IComment from '../../Post/IComment';
import IReaction from '../../Post/IReaction';
import IPost from '../../Post/IPost';

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

export const createReaction = (
	type: string,
	userId: string,
	postId: string
) => {
	return {
		type: CREATE_REACTION,
		payload: {
			type,
			userId,
			postId
		}
	};
};

export const addNewReaction = (reactions: IReaction[], postId: string) => {
	return {
		type: ADD_NEW_REACTION,
		payload: {
			reactions,
			postId
		}
	};
};
export const deletePost = (id, userId) => {
	return {
		type: DELETE_POST,
		payload: {
			id,
			userId
		}
	};
};
export const deletePostFromList = (id: string) => {
	return {
		type: DELETE_POST_FROM_LIST,
		payload: {
			id
		}
	};
};
export const updatePost = (post: IPost) => {
	return {
		type: UPDATE_POST,
		payload: {
			post
		}
	};
};
export const addNewPost = (post: IPost) => {
	return {
		type: ADD_NEW_POST,
		payload: {
			post
		}
	};
};
