import { all, takeEvery, call, put } from '@redux-saga/core/effects';
import { FETCH_SURVEYS, SET_SURVEYS, ADD_SURVEY } from './actionTypes';
import webApi from '../../../../services/webApi.service';
import config from '../../../../config';

export function* fetchSurveys(action) {
  try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/surveys'
		});

		yield put({
			type: SET_SURVEYS,
			payload: {
				surveys: data
			}
		});
	} catch (e) {
		console.log('survey saga fetch surveys: ', e.message);
	}
}

function* watchFetch() {
	yield takeEvery(FETCH_SURVEYS, fetchSurveys);
}

export function* createSurvey(action) {
  try {
		yield call(webApi, {
			method: 'POST',
      endpoint: config.API_URL + '/api/surveys',
      body: {
				// id: action.payload.password,
        // surveys: action.payload.token,
        // surveysQuestion: action.payload
			}
		});

		// yield put({ type: FETCH_SURVEYS });
	} catch (e) {
		console.log('survey saga create survey: ', e.message);
	}
}

function* watchAdd() {
	yield takeEvery(ADD_SURVEY, createSurvey);
}

export default function* survey() {
	yield all([watchFetch(), watchAdd()]);
}
