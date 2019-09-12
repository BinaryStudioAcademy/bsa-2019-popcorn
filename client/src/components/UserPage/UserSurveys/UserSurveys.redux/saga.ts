import { all, takeEvery, call, put } from '@redux-saga/core/effects';
import {
	FETCH_SURVEYS,
	FETCH_USER_SURVEYS,
	SET_SURVEYS,
	ADD_SURVEY,
	UPDATE_SURVEY,
	DELETE_SURVEY,
	RECREATE_SURVEY,
	SET_SURVEY_BYID,
	GET_SURVEY_BYID,
	POST_ANSWERS
} from './actionTypes';
import webApi from '../../../../services/webApi.service';
import config from '../../../../config';
import { setArrangementInSurveys } from '../UserSurveys.service';
import { transformDataToProps } from '../UserSurveys.service';

export function* fetchUserSurveys(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: '/api/surveys/user/' + action.payload.userId
		});
		if (data) {
			setArrangementInSurveys(data);
		}
		yield put({
			type: SET_SURVEYS,
			payload: {
				surveys: data,
				loading: false
			}
		});
	} catch (e) {
		console.log('survey saga fetch surveys: ', e.message);
	}
}

function* watchFetchUser() {
	yield takeEvery(FETCH_USER_SURVEYS, fetchUserSurveys);
}

export function* fetchSurveys() {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: '/api/surveys'
		});
		if (data) {
			setArrangementInSurveys(data);
		}
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

export function* addSurvey(action) {
	try {
		const data = yield call(webApi, {
			method: 'POST',
			endpoint: '/api/surveys',
			body: {
				...action.payload.data
			}
		});
		if (data) yield put({ type: FETCH_SURVEYS });
	} catch (e) {
		console.log('survey saga create survey: ', e.message);
	}
}

function* watchAdd() {
	yield takeEvery(ADD_SURVEY, addSurvey);
}

export function* updateSurvey(action) {
	try {
		const data = yield call(webApi, {
			method: 'PUT',
			endpoint: '/api/surveys/' + action.payload.id,
			body: {
				...action.payload.data
			}
		});
		if (data) yield put({ type: FETCH_SURVEYS });
	} catch (e) {
		console.log('survey saga update survey: ', e.message);
	}
}

function* watchUpdate() {
	yield takeEvery(UPDATE_SURVEY, updateSurvey);
}

function* deleteSurvey(action) {
	try {
		const data = yield call(webApi, {
			method: 'DELETE',
			endpoint: '/api/surveys/' + action.payload.id
		});
		if (data) yield put({ type: FETCH_SURVEYS });
	} catch (e) {
		console.log('survey saga delete survey: ', e.message);
	}
}

function* watchDelete() {
	yield takeEvery(DELETE_SURVEY, deleteSurvey);
}

function* getSurveyById(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: '/api/surveys/' + action.payload.id
		});
		
		const surveys = [data];

		if (data) {
			setArrangementInSurveys(surveys);
		}
		
		const formattedData = transformDataToProps(surveys);
		
		if (data)
			yield put({
				type: SET_SURVEY_BYID,
				payload: { survey: formattedData[0], loading: false }
			});
	} catch (e) {
		console.log('survey saga get by id: ', e.message);
	}
}

function* watchgetSurveyById() {
	yield takeEvery(GET_SURVEY_BYID, getSurveyById);
}

function* recreateSurvey(action) {
	try {
		const deletedData = yield call(webApi, {
			method: 'DELETE',
			endpoint: '/api/surveys/' + action.payload.id
		});
		if (deletedData) {
			const data = yield call(webApi, {
				method: 'POST',
				endpoint: '/api/surveys',
				body: {
					...action.payload.data
				}
			});
			if (data) yield put({ type: FETCH_SURVEYS });
		}
	} catch (e) {
		console.log('survey saga recreate survey: ', e.message);
	}
}

function* watchRecreate() {
	yield takeEvery(RECREATE_SURVEY, recreateSurvey);
}
function* postAnswers(action) {
	try {
		yield all(
			action.payload.data.map(answer =>
				call(webApi, {
					method: 'POST',
					endpoint: '/api/surveys/answer',
					body: {
						...answer
					}
				})
			)
		);

		yield put({ type: FETCH_SURVEYS });
	} catch (e) {
		console.log('survey saga post answers: ', e.message);
	}
}

function* watchPostAnswers() {
	yield takeEvery(POST_ANSWERS, postAnswers);
}

export default function* survey() {
	yield all([
		watchFetchUser(),
		watchFetch(),
		watchAdd(),
		watchUpdate(),
		watchDelete(),
		watchRecreate(),
		watchgetSurveyById(),
		watchPostAnswers()
	]);
}
