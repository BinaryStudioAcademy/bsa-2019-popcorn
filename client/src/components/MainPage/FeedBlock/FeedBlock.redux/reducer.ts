import { ADD_NEW_COMMENT, SET_POSTS } from './actionTypes';
import IComment from '../../Post/IComment';
import findIndexInArray from '../../../../helpers/findIndexInArray';
import IPost from '../../Post/IPost';

const initialState: { posts: null | Array<IPost> } = {
	posts: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_POSTS:
			return {
				...state,
				posts: action.payload.posts
			};
		case ADD_NEW_COMMENT:
			if (!state.posts) return state;
			const posts = [...state.posts];
			const comment = action.payload.comment.comment;

			const index = findIndexInArray(posts, 'id', comment.post.id);
			if (index === -1) return state;
			const post = posts[index];
			if (!post.comments) post.comments = [comment];
			else post.comments.push(comment);

			console.log(posts);
			return {
				...state,
				posts: [...posts]
			};
		default:
			return state;
	}
}
