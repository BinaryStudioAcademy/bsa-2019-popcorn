import { FETCH_FOLLOWERS_COUNT, FETCH_FOLLOWINGS_COUNT } from './actionTypes';

export const fetchFollowersCount = userId => {
	return {
		type: FETCH_FOLLOWERS_COUNT,
		payload: {
			userId
		}
	};
};

export const fetchFollowingsCount = userId => {
	return {
		type: FETCH_FOLLOWINGS_COUNT,
		payload: {
			userId
		}
	};
};
