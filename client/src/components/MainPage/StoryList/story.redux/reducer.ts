import {SET_STORIES} from "./actionTypes";


const initialState = {
    stories: null
};


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_STORIES:
            return{
                ...state,
                stories: action.payload.stories
            }
        default:
            return state;
    }
}