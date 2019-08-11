import {FETCH_MOVIE_LIST, SET_MOVIE_SERIES} from "./actionTypes";


export const fetchMovieList = (): any => {
    return {
        type: FETCH_MOVIE_LIST
    }
};

export const setMovieSeries = (movie): any => {
    return {
        type: SET_MOVIE_SERIES,
        payload: {
            movie
        }
    }
}