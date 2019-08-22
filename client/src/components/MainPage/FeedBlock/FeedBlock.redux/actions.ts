import {
	ADD_NEW_COMMENT,
	ADD_NEW_REACTION,
	CREATE_COMMENT,
	CREATE_REACTION,
	FETCH_POSTS,
  DELETE_POST
} from './actionTypes';
import IComment from '../../Post/IComment';
import IReaction from '../../Post/IReaction';


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

export const addNewReaction = (reactions: Array<IReaction>, postId: string) => {
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
