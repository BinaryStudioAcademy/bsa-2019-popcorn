import { SET_SURVEYS } from './actionTypes';

const initialState = {
	surveys: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_SURVEYS:
			return {
				...state,
				surveys: action.payload.surveys
			};
		default:
			return state;
	}
}
