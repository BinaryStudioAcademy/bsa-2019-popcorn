import { SET_TOPLIST } from './actionTypes';

const initialState = {
	tops: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_TOPLIST:
			return {
				...state,
				tops: action.payload.tops
			};
		default:
			return state;
	}
}
