import { START_FETCH_SEARCH_FILMS } from './actionTypes';

export const fetchFilms = text => {
	return {
		type: START_FETCH_SEARCH_FILMS,
		payload: {
			text
		}
	};
};
