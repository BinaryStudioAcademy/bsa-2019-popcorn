import {all, call, put, takeEvery} from 'redux-saga/effects';
import {
    FINISH_UPLOAD_AVATAR,
    SET_AVATAR,
    SET_TEMP_AVATAR,
    SET_USER_POSTS,
    START_UPLOAD_AVATAR,
    USER_POSTS
} from "./actionTypes";
import {uploadFile} from "../../services/file.service";
import axios from 'axios';
import {
    FETCH_LOGIN,
    FETCH_USER_BY_TOKEN,
    LOGIN,
    FETCH_REGISTRATION,
    SET_LOGIN_ERROR, SET_REGISTER_ERROR
} from "../authorization/actionTypes";
import config from '../../config';
import webApi from '../../services/webApi.service';

export function* uploadAvatar(action) {
    try {
        const data = yield call(uploadFile, action.payload.file);

        // remove public in order to save public path to img in server
        let url = (data.imageUrl).split(`\\`);
        url.shift();

        yield put({type: SET_TEMP_AVATAR, payload: {uploadUrl: config.API_URL + url.join('/')}})
    } catch (e) {
        console.log("user page saga catch: uploadAvatar", e.message);
    }
}


export function* setAvatar(action) {
    try {
        const res = yield call(axios.put, config.API_URL + action.payload.id, {avatar: action.payload.url});

        yield put({type: FINISH_UPLOAD_AVATAR, payload: {user: res.data.data.user}});
    } catch (e) {
        console.log("user page saga catch: setAvatar", e.message);
    }
}


export function* fetchLogin(action) {
    try {
        const {data: data} = yield call(axios.post, config.API_URL + "/api/auth/login", {...action.payload});

        localStorage.setItem('token', data.token);

        yield put({
            type: LOGIN,
            payload: {user: data.user[0]}
        });

    } catch (e) {
        console.log('user saga login', e.message)
        yield put({
            type: SET_LOGIN_ERROR,
            payload:{
                loginError: e.message
            }
        })
    }
}


export function* fetchUser(action) {
    const init: RequestInit = {
        headers: {Authorization: `Bearer ${action.payload.token}`}
    };

    try {
        let user = yield call(fetch, config.API_URL + '/api/auth/user', init);


        if (!user.ok) {
            localStorage.setItem('token', '');

            yield put({
                type: SET_LOGIN_ERROR,
                payload:{
                    loginError: "You have been absent for a long time"
                }

            });

        } else {
            user = yield call(user.json.bind(user));

            yield put({
                type: LOGIN,
                payload: {user: user.data.user}
            });
        }
    } catch (e) {
        console.log('user saga fetchUser:', e.message);
    }
};

export function* fetchRegistration(action){
    try{
        const data = yield call(axios.post, config.API_URL + "/api/auth/register", {...action.payload});
        localStorage.setItem('token', data.data.token);

        yield put({
            type: LOGIN,
            payload: {user: data.data.user[0]}
        });
    }catch (e) {
        console.log('user saga fetch registration:', e.message);
        yield put({
            type: SET_REGISTER_ERROR,
            payload:{
                registerError: e.message
            }
        })
    }
}

export function* fetchPosts(action) {
    try{
        const data = yield call(webApi, {endpoint: config.API_URL + '/api/post/user/'+action.payload.id, method:"GET"})

        yield put({
            type: SET_USER_POSTS,
            payload:{
                userPosts: data
            }
        })

    }catch(e){
        console.log("profile saga fetch posts:", e.message)
    }
}
function* watchFetchFilms() {
    yield takeEvery(START_UPLOAD_AVATAR, uploadAvatar);
}

function* watchSetAvatar() {
    yield takeEvery(SET_AVATAR, setAvatar)
}

function* watchFetchLogin() {
    yield takeEvery(FETCH_LOGIN, fetchLogin)
}

function* watchFetchUser() {
    yield takeEvery(FETCH_USER_BY_TOKEN, fetchUser)
}

function* watchFetchPosts(){
    yield takeEvery(USER_POSTS, fetchPosts);
}

function* watchFetchRegistration(){
    yield takeEvery(FETCH_REGISTRATION, fetchRegistration)
}
export default function* profile() {
    yield all([
        watchFetchFilms(),
        watchSetAvatar(),
        watchFetchLogin(),
        watchFetchUser(),
        watchFetchRegistration(),
        watchFetchPosts()
    ])
}