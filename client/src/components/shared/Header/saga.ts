import { all, takeEvery, put, call } from 'redux-saga/effects';
import {FINISH_FETCH_SEARCH_FILMS, START_FETCH_SEARCH_FILMS} from './actionTypes';
import axios from 'axios';

export function* fetchFilms(action){
    try {
        let films = yield call(axios.get, `http://localhost:5000/api/movie/find?title=${action.payload.text}`);

        yield put({
            type:FINISH_FETCH_SEARCH_FILMS,
            payload:{
                films: films.data
            }
        })
    }catch (e) {
        console.log(e)
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