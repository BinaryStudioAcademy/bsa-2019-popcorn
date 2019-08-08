import {FINISH_FETCH_SEARCH_FILMS} from "./actionTypes";


const initialState: {moviesSearch: Array<any>, alreadySearch:boolean} = {
    moviesSearch: [],
    alreadySearch: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FINISH_FETCH_SEARCH_FILMS:
            console.log(action.payload);
            return{
                ...state,
                moviesSearch:action.payload.films,
                alreadySearch:true
            };
        default:
            return state;
    }
}
