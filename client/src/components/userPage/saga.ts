import { all, takeEvery, put, call } from 'redux-saga/effects';
import {FINISH_UPLOAD_AVATAR, START_UPLOAD_AVATAR} from "./actionTypes";
import {uploadFile} from "../../services/file.service";
import axios from 'axios';

export function* uploadAvatar(action) {

    try {
        const data = yield call(uploadFile, action.payload.file);
        console.log(data);
        yield call(axios.post, {image: data.imageUrl});
        yield put({type: FINISH_UPLOAD_AVATAR,payload:{image:data.imageUrl}});
    }catch (e) {
        console.log("user page saga catch", e.message);
    }
}


function* watchFetchFilms(){
    yield takeEvery(START_UPLOAD_AVATAR, uploadAvatar);
}