import { SET_FOLLOWERS_COUNT, SET_FOLLOWINGS_COUNT } from './actionTypes';

const initialState = {
	followersCount: undefined,
	followingsCount: undefined
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_FOLLOWERS_COUNT:
			return {
				...state,
				followersCount: action.payload.count
			};
		case SET_FOLLOWINGS_COUNT:
			return {
				...state,
				followingsCount: action.payload.count
			};
		default:
			return state;
	}
}
