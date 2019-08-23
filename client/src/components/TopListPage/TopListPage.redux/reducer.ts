import { SET_TOP_LIST } from './actionTypes';

const initialState = {
	tops: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_TOP_LIST:
			return {
				...state,
				tops: action.payload.tops
			};
		default:
			return state;
	}
}
