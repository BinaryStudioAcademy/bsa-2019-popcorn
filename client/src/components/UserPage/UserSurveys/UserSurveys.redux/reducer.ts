import { SET_SURVEYS, SET_SURVEY_BYID, ADD_SURVEY, FETCH_SURVEYS, FETCH_USER_SURVEYS, DELETE_SURVEY } from './actionTypes';

const initialState = {
	surveys: [],
	survey: {},
	loading: true
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_SURVEYS:
			return {
				...state,
				surveys: action.payload.surveys,
				loading: false
			};
		case SET_SURVEY_BYID:
			return {
				...state,
				survey: action.payload.survey,
				loading: false
			};
		case ADD_SURVEY:
		case FETCH_SURVEYS:
		case FETCH_USER_SURVEYS:
		case DELETE_SURVEY:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
