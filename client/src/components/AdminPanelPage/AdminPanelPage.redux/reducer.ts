import * as ActionType from './actionTypes';

const initialState = {
	users: null,
	movies: null,
	posts: null,
	tops: null,
	stories: null,
	events: null,
	voting: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case ActionType.SET_USERS:
			return {
				...state,
				users: action.payload.users
			};
		case ActionType.SET_MOVIES:
			return {
				...state,
				movies: action.payload.movies
			};
		case ActionType.SET_POSTS:
			return {
				...state,
				posts: action.payload.posts
			};
		case ActionType.SET_TOPS:
			return {
				...state,
				tops: action.payload.tops
			};
		case ActionType.SET_STORIES:
			return {
				...state,
				stories: action.payload.stories
			};
		case ActionType.SET_EVENTS:
			return {
				...state,
				events: action.payload.events
			};
		case ActionType.SET_VOTING:
			return {
				...state,
				voting: action.payload.voting
			};
		default:
			return state;
	}
}
