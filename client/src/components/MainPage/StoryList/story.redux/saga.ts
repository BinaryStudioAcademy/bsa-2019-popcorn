import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	ADD_STORY,
	CREATE_STORY,
	DELETE_NEW_STORY,
	FETCH_STORIES,
	SET_STORIES
} from './actionTypes';
import webApi from '../../../../services/webApi.service';
import config from '../../../../config';

export function* fetchStories(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/story'
		});

		yield put({
			type: SET_STORIES,
			payload: {
				stories: data
			}
		});
	} catch (e) {
		console.log('story saga fetch: ' + e.message);
	}
}

export function* createStory(action) {
	const { newStory, userId } = action.payload;
	try {
		const story = yield call(webApi, {
			method: 'POST',
			endpoint: config.API_URL + '/api/story',
			body: {
				userId,
				...newStory,
				activityId: newStory.activity && newStory.activity.id
			}
		});

		yield put({
			type: ADD_STORY,
			payload: {
				story
			}
		});

		yield put({
			type: DELETE_NEW_STORY
		});
	} catch (e) {
		console.log('story saga create story: ', e.message);
	}
}

function* watchFetchStories() {
	yield takeEvery(FETCH_STORIES, fetchStories);
}

function* watchCreateStory() {
	yield takeEvery(CREATE_STORY, createStory);
}

export default function* story() {
	yield all([watchFetchStories(), watchCreateStory()]);
}
