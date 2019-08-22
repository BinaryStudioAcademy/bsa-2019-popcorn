import { FETCH_USER_REVIEWS, DELETE_REVIEW_BY_ID } from './actionTypes';

export const fetchUserReviews = (userId: string) => {
	return {
		type: FETCH_USER_REVIEWS,
		payload: { userId }
	};
};

export const deleteReviewById = (reviewId: string) => {
	return {
		type: DELETE_REVIEW_BY_ID,
		payload: { reviewId }
	};
};
