import * as ActionType from './actionTypes';

export const fetchUsers = () => {
	return {
		type: ActionType.FETCH_USERS
	};
};

export const fetchMovies = () => {
	return {
		type: ActionType.FETCH_MOVIES
	};
};

export const fetchPosts = () => {
	return {
		type: ActionType.FETCH_POSTS
	};
};

export const fetchTops = () => {
	return {
		type: ActionType.FETCH_TOPS
	};
};

export const fetchStories = () => {
	return {
		type: ActionType.FETCH_STORIES
	};
};

export const fetchEvents = () => {
	return {
		type: ActionType.FETCH_EVENTS
	};
};

export const fetchVoting = () => {
	return {
		type: ActionType.FETCH_VOTING
	};
};
