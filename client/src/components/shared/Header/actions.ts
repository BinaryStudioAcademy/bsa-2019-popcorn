import { START_FETCH_SEARCH_FILMS, SEND_TOKEN_TO_SERVER } from './actionTypes';

export const fetchFilms = (text: string) => {
	return {
		type: START_FETCH_SEARCH_FILMS,
		payload: {
			text
		}
	};
};
export const sendTokenToServer = (token: string | null): any => {
	return {
		type: SEND_TOKEN_TO_SERVER,
		payload: {
			token
		}
	};
};
