import { SET_RECOMMENDED } from './actionTypes';

const initialState: { recommended: any } = {
	recommended: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_RECOMMENDED:
			return {
				...state,
				recommended: action.payload
			};
		default:
			return state;
	}
}
