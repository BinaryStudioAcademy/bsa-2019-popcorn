import { FETCH_MOVIE_REVIEWS, SET_REACTION } from './actionTypes';

export const fetchMovieReviews = (movieId: string) => {
	return {
		type: FETCH_MOVIE_REVIEWS,
		payload: { movieId }
	};
};

export const setReaction = (reviewId, isLike) => {
	return {
		type: SET_REACTION,
		payload: { reviewId, isLike }
	};
};
