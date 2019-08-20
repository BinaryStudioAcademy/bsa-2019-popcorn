import {
	FETCH_SURVEYS,
	ADD_SURVEY,
	UPDATE_SURVEY,
	DELETE_SURVEY,
	RECREATE_SURVEY,
	GET_SURVEY_BYID
} from './actionTypes';

export const fetchSurveys = () => {
	return {
		type: FETCH_SURVEYS
	};
};

export const addSurvey = data => ({
	type: ADD_SURVEY,
	payload: {
		data
	}
});

export const updateSurvey = (id, data) => ({
	type: UPDATE_SURVEY,
	payload: {
		data,
		id
	}
});

export const deleteSurvey = id => ({
	type: DELETE_SURVEY,
	payload: {
		id
	}
});

export const recreateSurvey = (id, data) => ({
	type: RECREATE_SURVEY,
	payload: {
		data,
		id
	}
});

export const getSurveyById = id => ({
	type: GET_SURVEY_BYID,
	payload: {
		id
	}
});
