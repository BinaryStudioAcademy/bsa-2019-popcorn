import {
	FETCH_SURVEYS,
	FETCH_USER_SURVEYS,
	ADD_SURVEY,
	UPDATE_SURVEY,
	DELETE_SURVEY,
	RECREATE_SURVEY
} from './actionTypes';

export const fetchUserSurveys = id => {
	return {
		type: FETCH_USER_SURVEYS,
		payload: { userId: id }
	};
};

export const fetchSurveys = id => {
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
