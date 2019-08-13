import { FINISH_FETCH_SEARCH_FILMS } from '../../shared/Header/actionTypes';
import {
	SET_MOVIE_LIST,
	SET_MOVIE_SERIES,
	CLEAR_ElASTIC_MOVIE_LIST,
	SET_ElASTIC_MOVIE_LIST
} from './actionTypes';

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
	elasticSearchMovies: Array<any>;
	alreadySearch: boolean;
	alreadyElasticSearch: boolean;
	movieList: null | Array<Movie>;
	movieSeries: null | Movie;
} = {
	moviesSearch: [],
	elasticSearchMovies: [],
	alreadySearch: false,
	movieList: null,
	movieSeries: null,
	alreadyElasticSearch: false
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
				movieList: action.payload.movies,
				alreadySearch: true
			};
		case SET_MOVIE_SERIES:
			return {
				...state,
				movieSeries: action.payload.movie,
				alreadySearch: true
			};
		case SET_ElASTIC_MOVIE_LIST:
			return {
				...state,
				elasticSearchMovies: action.payload.elasticSearchMovies,
				alreadyElasticSearch: true
			};
		case CLEAR_ElASTIC_MOVIE_LIST:
			return {
				...state,
				elasticSearchMovies: [],
				alreadyElasticSearch: false
			};
		default:
			return state;
	}
}
