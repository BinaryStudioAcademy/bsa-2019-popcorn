import { FETCH_MOVIE_REVIEWS } from './actionTypes';

export const fetchMovieReviews = (movieId: string) => {
	return {
		type: FETCH_MOVIE_REVIEWS,
		payload: movieId
	};
};
