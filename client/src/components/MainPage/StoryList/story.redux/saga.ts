import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	CHANGE_ACTIVITY,
	CREATE_STORY,
	CREATE_VOTING,
	FETCH_STORIES,
	RESET_NEW_STORY,
	SAVE_VOTING_REACTION,
	SET_STORIES
} from './actionTypes';
import webApi from '../../../../services/webApi.service';

export function* fetchStories(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: '/api/story'
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
	newStory.textPositionX = newStory.textPosition.x;
	newStory.textPositionY = newStory.textPosition.y;
	delete newStory.textPosition;
	try {
		const story = yield call(webApi, {
			method: 'POST',
			endpoint: '/api/story',
			body: {
				userId,
				...newStory,
				activityId: newStory.activity && newStory.activity.id
			}
		});

		yield put({
			type: RESET_NEW_STORY
		});
	} catch (e) {
		console.log('story saga create story: ', e.message);
	}
}

export function* createVoting(action) {
	const options = action.payload.voting.options.map(option => {
		return {
			text: option.body,
			voted: option.voted
		};
	});
	try {
		const data = yield call(webApi, {
			method: 'POST',
			endpoint: '/api/voting',
			body: {
				...action.payload.voting,
				options
			}
		});

		yield call(webApi, {
			method: 'POST',
			endpoint: `/api/voting/${data.id}/options`,
			body: {
				options: action.payload.voting.options
			}
		});

		yield put({
			type: CHANGE_ACTIVITY,
			payload: {
				type: 'voting',
				activity: { id: data.id, name: data.header }
			}
		});
	} catch (e) {
		console.log('story modal creating vote: ', e.message);
	}
}

export function* sendVotingReaction(action) {
	const { userId, votingId, optionId } = action.payload;
	try {
		yield call(webApi, {
			endpoint: `/api/voting/options/react/${votingId}`,
			method: 'PUT',
			body: {
				userId,
				optionId
			}
		});
	} catch (e) {
		console.log(e);
	}
}

function* watchFetchStories() {
	yield takeEvery(FETCH_STORIES, fetchStories);
}

function* watchCreateStory() {
	yield takeEvery(CREATE_STORY, createStory);
}

function* watchCreateVoting() {
	yield takeEvery(CREATE_VOTING, createVoting);
}

function* watchSendVoteReaction() {
	yield takeEvery(SAVE_VOTING_REACTION, sendVotingReaction);
}

export default function* story() {
	yield all([
		watchFetchStories(),
		watchCreateStory(),
		watchCreateVoting(),
		watchSendVoteReaction()
	]);
}
