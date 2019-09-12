import { FETCH_RECOMMENDED, SET_RECOMMENDED_REACTION } from './actionTypes';

export const fetchRecommended = (userId: string) => {
	return {
		type: FETCH_RECOMMENDED,
		payload: userId
	};
};

export const setRecommendedReaction = (reviewId, isLike) => {
	return {
		type: SET_RECOMMENDED_REACTION,
		payload: { reviewId, isLike }
	};
};
