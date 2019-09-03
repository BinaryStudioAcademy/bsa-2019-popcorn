import { SAVE_MOVIE_LIST } from './actionTypes';

export const saveMovieList = (movieList: any) => ({
	type: SAVE_MOVIE_LIST,
	payload: { movieList }
});
