import { CONTENT_SEARCH_FETCH_DATA } from './actionTypes';

export const fetchData = (title, type) => ({
	type: CONTENT_SEARCH_FETCH_DATA,
	payload: { title, type }
});
