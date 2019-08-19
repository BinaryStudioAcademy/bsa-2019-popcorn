import {
	FETCH_MOVIE_LIST,
	SET_MOVIE_SERIES,
	CLEAR_ElASTIC_MOVIE_LIST,
	FECTH_SEARCH
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
		type: FECTH_SEARCH,
		payload: {
			title
		}
	};
};
