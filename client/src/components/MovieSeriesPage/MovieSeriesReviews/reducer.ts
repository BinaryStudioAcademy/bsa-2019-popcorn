import {
	FETCH_MOVIE_REVIEWS_SUCCESS,
	FETCH_MOVIE_REVIEWS
} from './actionTypes';
import {
	FETCH_USER_REVIEWS,
	FETCH_USER_REVIEWS_SUCCESS
} from '../../UserPage/UserReviews/actionTypes';

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
			return { ...state, isLoaded: false };
		case FETCH_MOVIE_REVIEWS_SUCCESS:
			return { ...state, reviewList: action.payload.reviews, isLoaded: true };
		case FETCH_USER_REVIEWS:
			return { ...state, loading: true };
		case FETCH_USER_REVIEWS_SUCCESS:
			return {
				...state,
				reviewUserList: action.payload.reviewUserList,
				loading: false
			};
		default:
			return state;
	}
};
