import {
	FETCH_MOVIE_LIST,
	SET_MOVIE_SERIES,
	CLEAR_ElASTIC_MOVIE_LIST,
	FETCH_SEARCH,
	RESET_SEARCH_MOVIE,
	FETCH_SEARCH_TO_ADD_MOVIE
} from './actionTypes';

export const fetchMovieList = (): any => {
	return {
		type: FETCH_MOVIE_LIST
	};
};

export const setMovieSeries = (movie): any => {
	return {
		type: SET_MOVIE_SERIES,
		payload: {
			movie
		}
	};
};

export const clearSearch = (): object => {
	return {
		type: CLEAR_ElASTIC_MOVIE_LIST
	};
};

export const fetchSearch = (title: string): any => {
	return {
		type: FETCH_SEARCH,
		payload: {
			title
		}
	};
};

export const resetSearch = (): any => {
	return {
		type: RESET_SEARCH_MOVIE
	};
};

export const fetchSearchToAddMovieInStory = (title: string): any => {
	return {
		type: FETCH_SEARCH_TO_ADD_MOVIE,
		payload: {
			title
		}
	};
};
