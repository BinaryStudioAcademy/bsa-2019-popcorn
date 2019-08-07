import { all, takeEvery, put, call } from 'redux-saga/effects';
import {FINISH_FETCH_SEARCH_FILMS, START_FETCH_SEARCH_FILMS} from './actionTypes';
import callWebApi from '../../services/webApi.service'

export function* fetchFilms(action){
    try {
        const films = yield call(callWebApi, {
            endpoint: `http://localhost:5000/movies/find?title=${action.payload.text}`,
            method: "GET"
        });
        yield put({
            type:FINISH_FETCH_SEARCH_FILMS,
            payload:{
                films
            }
        })
    }catch (e) {
        // TODO show error
    }
}


function* watchFetchFilms(){
    yield takeEvery(START_FETCH_SEARCH_FILMS, fetchFilms);
}
export default function* header() {
    yield all([
        watchFetchFilms()
    ])
};