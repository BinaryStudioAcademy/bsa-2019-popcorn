import { SEARCH_MOVIE_TITLE, DELETE_SEARCH_DATA } from './actionTypes';

export const searchTitle = (inputData: string) => ({
	type: SEARCH_MOVIE_TITLE,
	payload: { inputData }
});

export const deleteSearchData = () => ({
	type: DELETE_SEARCH_DATA
});
