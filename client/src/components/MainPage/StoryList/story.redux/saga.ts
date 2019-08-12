import {all, takeEvery, call} from 'redux-saga/effects';
import {FETCH_STORIES} from "./actionTypes";
import webApi from '../../../../services/webApi.service';
import config from "../../../../config";

export function* fetchStories(action) {
    try {
        const data = yield call(webApi, {method: "GET", endpoint: config.API_URL + '/api/story'});

        console.log(data);

    } catch (e) {
        console.log("story saga fetch: " + e.message)
    }
}


function* watchFetchStories() {
    yield takeEvery(FETCH_STORIES, fetchStories)
}

export default function* profile() {
    yield all([
        watchFetchStories()
    ])
}