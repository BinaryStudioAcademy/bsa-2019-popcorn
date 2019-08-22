import {
	FETCH_MOVIE_REVIEWS_SUCCESS,
	FETCH_MOVIE_REVIEWS
} from './actionTypes';
import {
	FETCH_USER_REVIEWS,
	FETCH_USER_REVIEWS_SUCCESS
} from '../../UserPage/UserReviews/actionTypes';
import movieAdapter from '../../MovieSeriesPage/movieAdapter';
const initialState: {
	reviewList?: any;
	isLoaded?: boolean;
	reviewUserList?: any;
	loading?: boolean;
} = {
	isLoaded: undefined,
	loading: true,
	reviewList: null,
	reviewUserList: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MOVIE_REVIEWS:
			return { ...state, reviewList: null, isLoaded: false };
		case FETCH_MOVIE_REVIEWS_SUCCESS:
			return { ...state, reviewList: action.payload.reviews, isLoaded: true };
		case FETCH_USER_REVIEWS:
			return { ...state, reviewUserList: null, loading: true };
		case FETCH_USER_REVIEWS_SUCCESS:
			const resultReviewUserList = action.payload.reviewUserList.map(review => {
				review.movie = movieAdapter(review.movie);
				return review;
			});
			return {
				...state,
				reviewUserList: resultReviewUserList,
				loading: false
			};
		default:
			return state;
	}
};
