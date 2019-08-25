import {
	SET_FOLLOWERS_COUNT,
	SET_FOLLOWINGS_COUNT,
	SET_FOLLOWERS,
	SET_FOLLOWINGS,
	CLEAR_FOLLOWS
} from './actionTypes';

const initialState = {
	followersCount: undefined,
	followingsCount: undefined,
	followSystem: {}
};

export default function(state = initialState, action) {
	let newState;
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
		case SET_FOLLOWERS:
			return {
				...state,
				followSystem: {
					...state.followSystem,
					[action.payload.userId]: { followers: action.payload.data }
				}
			};
		case SET_FOLLOWINGS:
			return {
				...state,
				followSystem: {
					...state.followSystem,
					[action.payload.userId]: { followings: action.payload.data }
				}
			};
		case CLEAR_FOLLOWS:
			newState = { ...state };
			delete newState.followSystem[action.payload.userId];
			return {
				...newState
			};
		default:
			return state;
	}
}
