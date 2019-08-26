import {
	SET_FOLLOWERS_COUNT,
	SET_FOLLOWINGS_COUNT,
	SET_FOLLOWERS,
	SET_FOLLOWINGS,
	CLEAR_FOLLOWS,
	SET_STATUS
} from './actionTypes';

const initialState = {
	followersCount: undefined,
	followingsCount: undefined,
	followSystem: {},
	followStatus: {}
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
					[action.payload.userId]: {
						...state.followSystem[action.payload.userId],
						followers: action.payload.data
					}
				}
			};
		case SET_FOLLOWINGS:
			return {
				...state,
				followSystem: {
					...state.followSystem,
					[action.payload.userId]: {
						...state.followSystem[action.payload.userId],
						followings: action.payload.data
					}
				}
			};
		case CLEAR_FOLLOWS:
			newState = { ...state };
			delete newState.followSystem[action.payload.userId];
			return {
				...newState
			};
		case SET_STATUS:
			return {
				...state,
				followStatus: { ...action.payload.data }
			};
		default:
			return state;
	}
}
