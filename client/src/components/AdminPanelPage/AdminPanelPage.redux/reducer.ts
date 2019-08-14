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

export default function(state = initialState, action) {
	switch (action.type) {
		case ActionType.SET_USERS:
			return {
				...state,
				users: action.payload.users
			};
		case ActionType.DELETE_USERS_SUCCESS:
			const userId = action.payload.userId;
			const userList = Object.assign([], state.users);
			const newUserList = userList.filter((user: any) => user.id != userId);

			return {
				...state,
				users: [...newUserList]
			};
		case ActionType.SET_MOVIES:
			return {
				...state,
				movies: action.payload.movies
			};
		case ActionType.DELETE_MOVIES_SUCCESS:
			const movieId = action.payload.movieId;
			const movieList = Object.assign([], state.movies);
			const newMovieList = movieList.filter(
				(movie: any) => movie.id != movieId
			);

			return {
				...state,
				movies: [...newMovieList]
			};
		case ActionType.SET_POSTS:
			return {
				...state,
				posts: action.payload.posts
			};
		case ActionType.DELETE_POSTS_SUCCESS:
			const postId = action.payload.postId;
			const postList = Object.assign([], state.posts);
			const newPostList = postList.filter((post: any) => post.id != postId);

			return {
				...state,
				posts: [...newPostList]
			};
		case ActionType.SET_TOPS:
			return {
				...state,
				tops: action.payload.tops
			};
		case ActionType.DELETE_TOPS_SUCCESS:
			const topId = action.payload.topId;
			const topList = Object.assign([], state.tops);
			const newTopList = topList.filter((top: any) => top.id != topId);

			return {
				...state,
				tops: [...newTopList]
			};
		case ActionType.SET_STORIES:
			return {
				...state,
				stories: action.payload.stories
			};
		case ActionType.DELETE_STORIES_SUCCESS:
			const storyId = action.payload.storyId;
			const storyList = Object.assign([], state.stories);
			const newStoryList = storyList.filter(
				(story: any) => story.id != storyId
			);

			return {
				...state,
				stories: [...newStoryList]
			};
		case ActionType.SET_EVENTS:
			return {
				...state,
				events: action.payload.events
			};
		case ActionType.DELETE_EVENTS_SUCCESS:
			const eventId = action.payload.eventId;
			const eventList = Object.assign([], state.events);
			const newEventList = eventList.filter(
				(event: any) => event.id != eventId
			);

			return {
				...state,
				events: [...newEventList]
			};
		case ActionType.SET_VOTING:
			return {
				...state,
				voting: action.payload.voting
			};
		case ActionType.DELETE_VOTING_SUCCESS:
			const votingId = action.payload.votingId;
			const votingList = Object.assign([], state.voting);
			const newVotingList = votingList.filter(
				(voting: any) => voting.id != votingId
			);

			return {
				...state,
				voting: [...newVotingList]
			};
		default:
			return state;
	}
}
