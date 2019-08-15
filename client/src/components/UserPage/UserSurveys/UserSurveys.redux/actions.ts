import { FETCH_SURVEYS, ADD_SURVEY } from './actionTypes';

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