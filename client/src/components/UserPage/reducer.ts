import {CANCEL_TEMP_AVATAR, FINISH_UPLOAD_AVATAR, SET_TEMP_AVATAR, SET_USER_POSTS} from "./actionTypes";
import {LOGIN, SET_LOGIN_ERROR, SET_REGISTER_ERROR} from "../authorization/actionTypes";

const initialState = {
    profileInfo: null,
    uploadUrl: '',
    userPosts: null,
    loginError: null,
    registerError: null
};


export default function (state = initialState, action) {
    switch (action.type) {
        case FINISH_UPLOAD_AVATAR:
            return {
                ...state,
                profileInfo: action.payload.user,
                uploadUrl: ''
            };
        case SET_TEMP_AVATAR: {
            return {
                ...state,
                uploadUrl: action.payload.uploadUrl
            }
        }
        case CANCEL_TEMP_AVATAR: {
            return {
                ...state,
                uploadUrl: ''
            }
        }
        case LOGIN:
            return {
                ...state,
                profileInfo: action.payload.user
            };
        case SET_USER_POSTS:
            return {
                ...state,
                userPosts: action.payload.userPosts
            };
        case SET_LOGIN_ERROR:
            return{
                ...state,
                loginError: action.payload.loginError
            };
            case SET_REGISTER_ERROR:
            return{
                ...state,
                registerError: action.payload.registerError
            };
        default:
            return state;
    }
}