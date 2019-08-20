import { SET_SURVEYS, SET_SURVEY_BYID } from './actionTypes';

const initialState = {
	surveys: [],
	survey: {},
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
		case SET_SURVEY_BYID:
			return {
				...state,
				survey: action.payload.survey,
				loading: action.payload.loading
			};
		default:
			return state;
	}
}
