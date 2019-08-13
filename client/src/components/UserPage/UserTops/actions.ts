import {START_SEARCH_ELASTIC_FILMS} from "./actionTypes";

export const fetchFilms = (title) => {
    return{
        type:START_SEARCH_ELASTIC_FILMS,
        payload: {
            title
        }
    }
};