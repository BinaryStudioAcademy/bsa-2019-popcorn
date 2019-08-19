import { FINISH_FETCH_SEARCH_FILMS } from '../../shared/Header/actionTypes';
import {
	RESET_SEARCH_MOVIE,
	SET_MOVIE_LIST,
	SET_MOVIE_SERIES,
	SET_SEARCH_MOVIE
} from './actionTypes';
import TMovie from '../TMovie';
import movieAdapter from '../movieAdapter';

const initialState: {
	moviesSearch: Array<TMovie>;
	alreadySearch: boolean;
	movieList: null | Array<TMovie>;
	movieSeries: null | TMovie;
	moviesSearchInCreating: null | Array<TMovie>;
} = {
	moviesSearch: [],
	alreadySearch: false,
	movieList: null,
	movieSeries: null,
	moviesSearchInCreating: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FINISH_FETCH_SEARCH_FILMS:
			return {
				...state,
				moviesSearch: (action.payload.films || []).map(movieAdapter),
				alreadySearch: true
			};
		case SET_MOVIE_LIST:
			return {
				...state,
				movieList: (action.payload.movies || []).map(movieAdapter),
				alreadySearch: true
			};
		case SET_MOVIE_SERIES:
			return {
				...state,
				movieSeries: action.payload.movie,
				alreadySearch: true
			};
		case SET_SEARCH_MOVIE:
			return {
				...state,
				moviesSearchInCreating: (action.payload.movies || []).map(movieAdapter)
			};
		case RESET_SEARCH_MOVIE:
			return {
				...state,
				moviesSearchInCreating: null
			};

		default:
			return state;
	}
}
