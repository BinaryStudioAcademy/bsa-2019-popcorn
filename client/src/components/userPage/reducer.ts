import {FINISH_UPLOAD_AVATAR} from "./actionTypes";

const initialState = {

};


export default function (state = initialState, action) {
    switch (action.type) {
        case FINISH_UPLOAD_AVATAR:
            console.log(action.payload);
            return{
                ...state
            };
        default:
            return state;
    }
}