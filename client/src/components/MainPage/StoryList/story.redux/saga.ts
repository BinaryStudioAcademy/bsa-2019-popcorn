import {all, call, put, takeEvery} from 'redux-saga/effects';
import config from '../../../../config';
import webApi from '../../../../services/webApi.service';
import {FETCH_STORIES} from "./actionTypes";

export function* fetchStories(action){

}



function* watchFetchStories(){
    yield takeEvery(FETCH_STORIES, fetchStories)
}

export default function* profile() {
    yield all([
        watchFetchStories()
    ])
}