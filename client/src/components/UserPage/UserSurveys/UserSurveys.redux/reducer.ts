import { SET_SURVEYS } from './actionTypes';

const initialState = {
	surveys: [],
	loading: true
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_SURVEYS:
			return {
				...state,
				surveys: action.payload.surveys,
				loading: action.payload.loading
			};
		default:
			return state;
	}
}
