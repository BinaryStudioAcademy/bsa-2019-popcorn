import { CONTENT_SEARCH_FETCH_DATA, RESET_SEARCH_DATA } from './actionTypes';

export const fetchData = (title, type) => ({
	type: CONTENT_SEARCH_FETCH_DATA,
	payload: { title, type }
});

export const reset = () => ({
	type: RESET_SEARCH_DATA
});
