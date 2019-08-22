import { FETCH_POSTS, DELETE_POST } from './actionTypes';

export const fetchPosts = () => {
	return {
		type: FETCH_POSTS
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
