import {
	FETCH_USER_WATCH_LIST,
	SAVE_WATCH_ITEM,
	MOVE_WATCH_ITEM_TO_WATCHED,
	DELETE_WATCH_ITEM
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
