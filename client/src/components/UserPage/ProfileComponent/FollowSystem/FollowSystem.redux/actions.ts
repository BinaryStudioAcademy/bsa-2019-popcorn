import {
	FETCH_FOLLOWERS_COUNT,
	FETCH_FOLLOWINGS_COUNT,
	FETCH_FOLLOWERS,
	FETCH_FOLLOWINGS,
	CLEAR_FOLLOWS,
	CHECK_STATUS,
	CHANGE_STATUS
} from './actionTypes';

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

export const fetchFollowers = userId => {
	return {
		type: FETCH_FOLLOWERS,
		payload: {
			userId
		}
	};
};

export const fetchFollowings = userId => {
	return {
		type: FETCH_FOLLOWINGS,
		payload: {
			userId
		}
	};
};

export const clearFollows = userId => {
	return {
		type: CLEAR_FOLLOWS,
		payload: {
			userId
		}
	};
};

export const checkStatus = (userId, followerId) => {
	return {
		type: CHECK_STATUS,
		payload: {
			userId,
			followerId
		}
	};
};

export const changeStatus = (userId, followerId) => {
	return {
		type: CHANGE_STATUS,
		payload: {
			userId,
			followerId
		}
	};
};
