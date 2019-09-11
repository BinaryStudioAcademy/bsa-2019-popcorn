import { all, call, put, takeEvery } from '@redux-saga/core/effects';

import {
	FETCH_RECOMMENDED,
	SET_RECOMMENDED,
	SET_RECOMMENDED_REACTION,
	SET_RECOMMENDED_REACTION_SUCCESS
} from './actionTypes';

import webApi from '../../../../services/webApi.service';

export function* fetchRecommended(action) {
	try {
		const recommended = yield call(webApi, {
			method: 'GET',
			endpoint: `api/recommended/${action.payload}`
		});
		yield put({
			type: SET_RECOMMENDED,
			payload: recommended
		});
	} catch (e) {
		console.log('fet recommended saga', e.message);
	}
}
export function* setRecommendedReaction(action) {
	const { reviewId, isLike } = action.payload;
	try {
		const response = yield call(webApi, {
			endpoint: `/api/review/reaction`,
			method: 'POST',
			body: { reviewId, isLike }
		});
		yield put({
			type: SET_RECOMMENDED_REACTION_SUCCESS,
			payload: {
				updatedReaction: response,
				reviewId
			}
		});
	} catch (e) {
		console.log(e);
	}
}

function* watchFetchRecommended() {
	yield takeEvery(FETCH_RECOMMENDED, fetchRecommended);
}

function* watchSetRecommendedReaction() {
	yield takeEvery(SET_RECOMMENDED_REACTION, setRecommendedReaction);
}

export default function* recommendedSaga() {
	yield all([watchFetchRecommended(), watchSetRecommendedReaction()]);
}
