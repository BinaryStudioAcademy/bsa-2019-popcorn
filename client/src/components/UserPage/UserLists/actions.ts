import {
	SAVE_MOVIE_LIST,
	FETCH_MOVIE_LISTS_PREVIEW,
	DELETE_MOVIE_LIST
} from './actionTypes';

export const saveMovieList = (movieList: any) => ({
	type: SAVE_MOVIE_LIST,
	payload: { movieList }
});

export const fetchMovieListsPreview = () => ({
	type: FETCH_MOVIE_LISTS_PREVIEW
});

export const deleteMovieList = (movieListId: string) => ({
	type: DELETE_MOVIE_LIST,
	payload: { movieListId }
});
