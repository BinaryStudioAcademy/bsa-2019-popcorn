import { FINISH_FETCH_SEARCH_FILMS } from '../../shared/Header/actionTypes';
import { SET_MOVIE_LIST, SET_MOVIE_SERIES } from './actionTypes';

type Movie = {
	id: string;
	title: string;
	year?: number;
	image: string;
	duration: string;
	genres: Array<string>;
	cast: Array<string>;
};

const initialState: {
	moviesSearch: Array<Movie>;
	alreadySearch: boolean;
	movieList: null | Array<Movie>;
	movieSeries: null | Movie;
} = {
	moviesSearch: [],
	alreadySearch: false,
	movieList: null,
	movieSeries: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FINISH_FETCH_SEARCH_FILMS:
			return {
				...state,
				moviesSearch: action.payload.films,
				alreadySearch: true
			};
		case SET_MOVIE_LIST:
			return {
				...state,
				movieList: action.payload.movies
			};
		case SET_MOVIE_SERIES:
			return {
				...state,
				movieSeries: action.payload.movie
			};
		default:
			return state;
	}
}
