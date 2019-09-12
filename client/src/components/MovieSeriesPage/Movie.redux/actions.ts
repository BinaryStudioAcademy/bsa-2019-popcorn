import {
	FETCH_MOVIE_LIST,
	SET_MOVIE_SERIES,
	CLEAR_ElASTIC_MOVIE_LIST,
	FETCH_MOVIE_BY_ID,
	FETCH_SEARCH,
	RESET_SEARCH_MOVIE,
	FETCH_SEARCH_TO_ADD_MOVIE,
	LOAD_MORE_MOVIE,
	FETCH_REVIEW_BY_USER_MOVIE_ID,
	SET_REVIEW,
	REMOVE_REVIEW_SET,
	GET_AWARDS,
	FETCH_FILTRED_MOVIES,
	LOAD_MORE_FILTRED_MOVIE,
	SET_FILTERS,
	GET_GENRES,
	FETCH_STATISTICS,
	FETCH_POSTS_BY_FILM,
	SET_NEW_MOVIE_RATE_INFO
} from './actionTypes';

export const getGenres = (): any => {
	return {
		type: GET_GENRES
	};
};

export const fetchMovieList = (): any => {
	return {
		type: FETCH_MOVIE_LIST
	};
};

export const fetchFiltredMovies = (filters): any => {
	return {
		type: FETCH_FILTRED_MOVIES,
		payload: filters
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

export const fetchAwards = (id): any => {
	return {
		type: GET_AWARDS,
		payload: {
			id
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

export const fetchMovie = (movieId: string): object => {
	return {
		type: FETCH_MOVIE_BY_ID,
		payload: {
			movieId
		}
	};
};

export const setFilters = (filters: any): object => {
	return {
		type: SET_FILTERS,
		payload: {
			filters
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

export const loadMoreMovie = (size: number, from: number): any => {
	return {
		type: LOAD_MORE_MOVIE,
		payload: {
			size,
			from
		}
	};
};

export const loadMoreFiltredMovie = (
	size: number,
	from: number,
	filters: any
): any => {
	return {
		type: LOAD_MORE_FILTRED_MOVIE,
		payload: {
			size,
			from,
			filters
		}
	};
};

export const fetchReviewByMovieUserId = (
	userId: string,
	movieId: string
): any => {
	return {
		type: FETCH_REVIEW_BY_USER_MOVIE_ID,
		payload: {
			userId,
			movieId
		}
	};
};

export const setReview = (
	userId: string,
	movieId: string,
	text: string,
	prevId = null
) => {
	return {
		type: SET_REVIEW,
		payload: {
			userId,
			movieId,
			text,
			prevId
		}
	};
};

export const removeReviewSet = () => {
	return {
		type: REMOVE_REVIEW_SET
	};
};

export const fetchStatistics = (movieId: string) => {
	return {
		type: FETCH_STATISTICS,
		payload: {
			movieId
		}
	};
};

export const fetchPostsByFilm = (movieId: string) => {
	return {
		type: FETCH_POSTS_BY_FILM,
		payload: {
			movieId
		}
	};
};

export const setNewRateInfo = (rateInfo: any) => ({
	type: SET_NEW_MOVIE_RATE_INFO,
	payload: { rateInfo }
});
