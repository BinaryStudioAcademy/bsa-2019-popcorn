import { FETCH_USER_REVIEWS } from './actionTypes';

export const fetchUserReviews = (userId: string) => {
	return {
		type: FETCH_USER_REVIEWS,
		payload: { userId }
	};
};
