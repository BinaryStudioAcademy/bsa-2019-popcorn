import {
	FETCH_MOVIE_REVIEWS_SUCCESS,
	FETCH_MOVIE_REVIEWS
} from './actionTypes';

const initialState: {
	reviewList: null | any;
	loading: null | boolean;
} = {
	loading: true,
	reviewList: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MOVIE_REVIEWS:
			return { ...state, loading: true };
		case FETCH_MOVIE_REVIEWS_SUCCESS:
			return { ...state, reviewList: action.payload.reviews, loading: false };
		default:
			return state;
	}
};
