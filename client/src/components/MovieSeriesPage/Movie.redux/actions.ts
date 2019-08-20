import {
	FETCH_MOVIE_LIST,
	SET_MOVIE_SERIES,
	CLEAR_ElASTIC_MOVIE_LIST,
	FETCH_MOVIE_USER_RATE,
	FETCH_MOVIE_BY_ID,
	SET_USER_RATE,
	FETCH_SEARCH,
	RESET_SEARCH_MOVIE
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

export const fetchSearch = (title: string): any => {
	return {
		type: FETCH_SEARCH,
		payload: {
			title
		}
	};
};

export const fetchMovie = (movieId: string): object => {
	return {
		type: FETCH_MOVIE_BY_ID,
		payload: {
			movieId
		}
	};
};

export const setUserRate = (userRate: any): object => {
	const { userId, movieId, rate } = userRate;
	return {
		type: SET_USER_RATE,
		payload: {
			userId,
			movieId,
			rate
		}
	};
};

export const resetSearch = (): any => {
	return {
		type: RESET_SEARCH_MOVIE
	};
};
