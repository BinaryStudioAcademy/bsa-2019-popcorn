import {CANCEL_TEMP_AVATAR, FINISH_UPLOAD_AVATAR, SET_TEMP_AVATAR} from "./actionTypes";
import {LOGIN} from "../authorization/actionTypes";

const initialState = {
    profileInfo:null,
    uploadUrl: ''
};


export default function (state = initialState, action) {
    switch (action.type) {
        case FINISH_UPLOAD_AVATAR:
            return{
                ...state,
                profileInfo: action.payload.user,
                uploadUrl: ''
            };
        case SET_TEMP_AVATAR:{
            return{
                ...state,
                uploadUrl: action.payload.uploadUrl
            }
        }
        case CANCEL_TEMP_AVATAR:{
            return{
                ...state,
                uploadUrl: ''
            }
        }
        case LOGIN:
            console.log(action.payload.user);
            return{
                ...state,
                profileInfo: action.payload.user
            }
        default:
            return state;
    }
}