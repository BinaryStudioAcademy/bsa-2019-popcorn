import { FETCH_RECOMMENDED } from './actionTypes';

export const fetchRecommended = (userId: string) => {
	return {
		type: FETCH_RECOMMENDED,
		payload: userId
	};
};
