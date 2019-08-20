import {
	FETCH_SURVEYS,
	ADD_SURVEY,
	UPDATE_SURVEY,
	DELETE_SURVEY,
	RECREATE_SURVEY
} from './actionTypes';

export const fetchSurveys = id => {
	return {
		type: FETCH_SURVEYS,
		payload: { userId: id }
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
