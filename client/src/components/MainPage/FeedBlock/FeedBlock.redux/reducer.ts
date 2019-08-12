import {SET_POSTS} from "./actionTypes";


const initialState = {
    posts: null
};



export default function(state = initialState, action){
    switch (action.type) {
        case SET_POSTS:
            return{
                ...state,
                posts: action.payload.posts
            };
        default:
            return state;
    }
}