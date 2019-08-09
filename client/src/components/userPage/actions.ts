import {CANCEL_TEMP_AVATAR, SET_AVATAR, START_UPLOAD_AVATAR} from "./actionTypes";


export const uploadAvatar = (file: FormData, id: string): any => {
    return {
        type: START_UPLOAD_AVATAR,
        payload: {
            file, id
        }
    }
};

export const cancelAvatar = ()=>{
    return {
        type: CANCEL_TEMP_AVATAR
    }
};

export const setAvatar = (url)=>{
    return{
        type: SET_AVATAR,
        payload:{
            url
        }
    }
};