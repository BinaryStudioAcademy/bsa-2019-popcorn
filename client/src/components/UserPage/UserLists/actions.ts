import {
	SAVE_MOVIE_LIST,
	FETCH_MOVIE_LISTS_PREVIEW,
	DELETE_MOVIE_LIST,
	FETCH_MOVIE_LIST_DETAILS
} from './actionTypes';

export const saveMovieList = (movieList: any) => ({
	type: SAVE_MOVIE_LIST,
	payload: { movieList }
});

export const fetchMovieListsPreview = (userId: string) => ({
	type: FETCH_MOVIE_LISTS_PREVIEW,
	payload: { userId }
});

export const deleteMovieList = (movieListId: string) => ({
	type: DELETE_MOVIE_LIST,
	payload: { movieListId }
});

export const fetchMovieListDetails = (movieListId: string) => ({
	type: FETCH_MOVIE_LIST_DETAILS,
	payload: { movieListId }
});
