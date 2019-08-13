import * as ActionType from './actionTypes';

export const fetchUsers = () => {
	return {
		type: ActionType.FETCH_USERS
	};
};
export const deleteUsers = userId => {
	return {
		type: ActionType.DELETE_USERS,
		payload: {
			userId
		}
	};
};

export const fetchMovies = () => {
	return {
		type: ActionType.FETCH_MOVIES
	};
};
export const deleteMovies = movieId => {
	return {
		type: ActionType.DELETE_MOVIES,
		payload: {
			movieId
		}
	};
};

export const fetchPosts = () => {
	return {
		type: ActionType.FETCH_POSTS
	};
};
export const deletePosts = postId => {
	return {
		type: ActionType.DELETE_POSTS,
		payload: {
			postId
		}
	};
};

export const fetchTops = () => {
	return {
		type: ActionType.FETCH_TOPS
	};
};
export const deleteTops = topId => {
	return {
		type: ActionType.DELETE_TOPS,
		payload: {
			topId
		}
	};
};

export const fetchStories = () => {
	return {
		type: ActionType.FETCH_STORIES
	};
};
export const deleteStories = storyId => {
	return {
		type: ActionType.DELETE_STORIES,
		payload: {
			storyId
		}
	};
};

export const fetchEvents = () => {
	return {
		type: ActionType.FETCH_EVENTS
	};
};
export const deleteEvents = eventId => {
	return {
		type: ActionType.DELETE_EVENTS,
		payload: {
			eventId
		}
	};
};

export const fetchVoting = () => {
	return {
		type: ActionType.FETCH_VOTING
	};
};
export const deleteVoting = votingId => {
	return {
		type: ActionType.DELETE_VOTING,
		payload: {
			votingId
		}
	};
};
