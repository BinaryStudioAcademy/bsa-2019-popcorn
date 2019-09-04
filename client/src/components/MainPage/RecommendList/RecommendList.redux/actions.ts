import { FETCH_RECOMMENDED } from './actionTypes';

export const fetchRecommended = (userId: string) => {
	console.log('hello');
	return {
		type: FETCH_RECOMMENDED,
		payload: userId
	};
};
