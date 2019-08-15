import { FETCH_SURVEYS, ADD_SURVEY, UPDATE_SURVEY, DELETE_SURVEY } from './actionTypes';

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

export const deleteSurvey = (id) => ({
  type: DELETE_SURVEY,
  payload: {
    id
  }
});