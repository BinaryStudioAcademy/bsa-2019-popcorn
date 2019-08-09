import { all, takeEvery, put, call } from 'redux-saga/effects';
import {FINISH_UPLOAD_AVATAR, SET_AVATAR, SET_TEMP_AVATAR, START_UPLOAD_AVATAR} from "./actionTypes";
import {uploadFile} from "../../services/file.service";
import axios from 'axios';
import {FETCH_LOGIN} from "../authorization/actionTypes";

export function* uploadAvatar(action) {
    try {
        const data = yield call(uploadFile, action.payload.file);

        // remove public in order to save public path to img in server
        let url =  (data.imageUrl).split(`\\`);
        url.shift();

        yield put({type: SET_TEMP_AVATAR, payload:{uploadUrl:"http://localhost:5000/"+url.join('/')}})
    }catch (e) {
        console.log("user page saga catch: uploadAvatar", e.message);
    }
}


export function* setAvatar(action){
    try {
        const res = yield call(axios.put, `http://localhost:5000/api/user/${action.payload.id}`, {avatar: action.payload.url});

        yield put({type: FINISH_UPLOAD_AVATAR, payload: {user: res.data.data.user}});
    }catch(e){
        console.log("user page saga catch: setAvatar", e.message);
    }
}


export function* fetchLogin(action){
    try{
        
    }
}


function* watchFetchFilms(){
    yield takeEvery(START_UPLOAD_AVATAR, uploadAvatar);
}

function* watchSetAvatar(){
    yield takeEvery(SET_AVATAR, setAvatar)
}

function* watchFetchLogin(){
    yield takeEvery(FETCH_LOGIN, fetchLogin)
}



export default function* header() {
    yield all([
        watchFetchFilms(),
        watchSetAvatar(),
        watchFetchLogin()
        ])
}