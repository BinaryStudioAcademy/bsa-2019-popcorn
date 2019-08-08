import {START_UPLOAD_AVATAR} from "./actionTypes";


export const uploadAvatar = (file: FormData) =>{
    return {
        type: START_UPLOAD_AVATAR,
        payload:{
            file
        }
    }
};