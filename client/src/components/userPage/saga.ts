import { all, takeEvery, put, call } from 'redux-saga/effects';
import {FINISH_UPLOAD_AVATAR, START_UPLOAD_AVATAR} from "./actionTypes";
import {uploadFile} from "../../services/file.service";
import axios from 'axios';

export function* uploadAvatar(action) {
    try {
        const data = yield call(uploadFile, action.payload.file);

        // remove public in order to save public path to img in server
        let url =  (data.imageUrl).split(`\\`);
        url.shift();


        
        const res = yield call(axios.put, `http://localhost:5000/api/user/${action.payload.id}`, {avatar: "http://localhost:5000/"+url.join('/')});

        yield put({type: FINISH_UPLOAD_AVATAR,payload:{user: res.data.data.user}});
    }catch (e) {
        console.log("user page saga catch", e.message);
    }
}


function* watchFetchFilms(){
    yield takeEvery(START_UPLOAD_AVATAR, uploadAvatar);
}

export default function* header() {
    yield all([
        watchFetchFilms()
        ])
}