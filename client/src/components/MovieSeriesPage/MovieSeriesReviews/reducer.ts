import { FETCH_MOVIE_REVIEWS_SUCCESS } from './actionTypes';

const initialState: {
	reviewList: null | any;
} = {
	reviewList: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MOVIE_REVIEWS_SUCCESS:
			return { ...state, reviewList: action.payload.reviews };
		default:
			return state;
	}
};
