import {
	FETCH_USER_WATCH_LIST,
	SAVE_WATCH_ITEM,
	MOVE_WATCH_ITEM_TO_WATCHED,
	DELETE_WATCH_ITEM,
	FETCH_WATCH_LIST_STATUS,
	ADD_MOVIE_TO_WATCH_LIST,
	DELETE_MOVIE_FROM_WATCH_LIST
} from './actionTypes';

export const fetchWatchList = () => ({
	type: FETCH_USER_WATCH_LIST
});

export const saveWatchItem = (movie: any) => ({
	type: SAVE_WATCH_ITEM,
	payload: { movie }
});

export const moveToWatched = (watchId: string) => ({
	type: MOVE_WATCH_ITEM_TO_WATCHED,
	payload: { watchId }
});

export const deleteWatchItem = (watchId: string) => ({
	type: DELETE_WATCH_ITEM,
	payload: { watchId }
});

export const fetchWatchListStatus = (movieId: string) => ({
	type: FETCH_WATCH_LIST_STATUS,
	payload: { movieId }
});

export const addMovieToWatchList = (movieId: string) => ({
	type: ADD_MOVIE_TO_WATCH_LIST,
	payload: { movieId }
});

export const deleteMovieFromWatchList = (watchId: string, movieId: string) => ({
	type: DELETE_MOVIE_FROM_WATCH_LIST,
	payload: { watchId, movieId }
});
