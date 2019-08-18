import {
	FETCH_MOVIE_LIST,
	SET_MOVIE_SERIES,
	CLEAR_ElASTIC_MOVIE_LIST,
	FETCH_MOVIE_USER_RATE
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

export const fetchUserRate = (userId: string, movieId: string): object => {
	return {
		type: FETCH_MOVIE_USER_RATE,
		payload: {
			userId,
			movieId
		}
	};
};
