import {
	ADD_NEW_COMMENT,
	ADD_NEW_POST,
	ADD_NEW_REACTION,
	DELETE_POST_FROM_LIST,
	SET_POSTS,
	UPDATE_POST
} from './actionTypes';
import IComment from '../../Post/IComment';
import findIndexInArray from '../../../../helpers/findIndexInArray';
import IPost from '../../Post/IPost';

const initialState: { posts: null | IPost[] } = {
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
			return {
				...state,
				posts: [...posts]
			};
		case ADD_NEW_REACTION:
			if (!state.posts) return state;
			const postsForNewReact = [...state.posts];
			const { reactions, postId } = action.payload;

			const i = findIndexInArray(postsForNewReact, 'id', postId);
			if (i === -1) return state;
			const postForNewReact = postsForNewReact[i];
			postForNewReact.reactions = [...reactions];

			return {
				...state,
				posts: [...postsForNewReact]
			};
		case DELETE_POST_FROM_LIST:
			const { id } = action.payload;
			if (!id || !state.posts) {
				return state;
			}

			const postsList = [...state.posts];

			const indexPost = postsList.findIndex(elem => elem.id === id);
			if (indexPost === -1) {
				return state;
			}

			postsList.splice(indexPost, 1);
			return {
				...state,
				posts: [...postsList]
			};
		case UPDATE_POST:
			const updatePost = action.payload.post;
			if (!updatePost || !state.posts) {
				return state;
			}

			const postsListForUpdate = [...state.posts];

			const indexUpdatePost = postsListForUpdate.findIndex(
				elem => elem.id === updatePost.id
			);
			if (indexUpdatePost === -1) {
				return state;
			}

			postsListForUpdate[indexUpdatePost] = updatePost;
			return {
				...state,
				posts: [...postsListForUpdate]
			};
		case ADD_NEW_POST:
			const newPost: IPost = action.payload.post;
			if (!newPost) {
				return state;
			}

			return { posts: [newPost, ...(state.posts || [])] };

		default:
			return state;
	}
}
