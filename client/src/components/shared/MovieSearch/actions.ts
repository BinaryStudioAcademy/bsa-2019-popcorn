import { SEARCH_MOVIE_TITLE } from './actionTypes';

export const searchTitle = (inputData: string) => ({
	type: SEARCH_MOVIE_TITLE,
	payload: { inputData }
});
