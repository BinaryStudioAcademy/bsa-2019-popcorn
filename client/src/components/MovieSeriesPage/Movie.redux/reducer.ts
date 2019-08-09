import {FINISH_FETCH_SEARCH_FILMS} from "../../shared/Header/actionTypes";
import {SET_MOVIE_LIST} from "./actionTypes";

type Movie = {
        id: string,
        title: string,
        year?: number,
        image: string,
        duration: string,
        genres: Array<string>,
        cast: Array<string>
}

const initialState: {moviesSearch: Array<Movie>, alreadySearch:boolean, movieList: null | Array<Movie>} = {
    moviesSearch: [],
    alreadySearch: false,
    movieList: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FINISH_FETCH_SEARCH_FILMS:
            return{
                ...state,
                moviesSearch:action.payload.films,
                alreadySearch:true
            };
        case SET_MOVIE_LIST:
            return{
                ...state,
                movieList: action.payload.movies
            }
        default:
            return state;
    }
}
