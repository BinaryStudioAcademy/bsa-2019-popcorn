import { FINISH_FETCH_SEARCH_FILMS } from '../../shared/Header/actionTypes';
import {
	LOADING,
	RESET_SEARCH_MOVIE,
	SET_MOVIE_LIST,
	SET_MOVIE_SERIES,
	SET_SEARCH_MOVIE,
	SET_SEARCH_MOVIE_TO_ADD,
	FETCH_MOVIE_USER_RATE_SUCCESS,
	FETCH_MOVIE_BY_ID_SUCCESS,
	SET_LOAD_MORE_MOVIE,
	FETCH_REVIEW_BY_USER_MOVIE_ID_SUCCESS
} from './actionTypes';
import TMovie from '../TMovie';
import movieAdapter from '../movieAdapter';

const initialState: {
	moviesSearch: Array<TMovie>;
	alreadySearch: boolean;
	movieList: null | Array<TMovie>;
	movieSeries: null | TMovie;
	userRate: null | string;
	fetchedMovie: null | TMovie;
	moviesSearchInCreating: null | Array<TMovie>;
	moviesSearchAddMovieToStory: null | Array<TMovie>;
	searchTitle: string;
	isLoading: boolean;
	ownReview: any;
} = {
	moviesSearch: [],
	alreadySearch: false,
	movieList: null,
	movieSeries: null,
	moviesSearchInCreating: null,
	moviesSearchAddMovieToStory: null,
	isLoading: false,
	searchTitle: '',
	userRate: null,
	fetchedMovie: null,
	ownReview: null
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
		case FETCH_MOVIE_USER_RATE_SUCCESS:
			return {
				...state,
				userRate: action.payload.userRate
			};
		case FETCH_MOVIE_BY_ID_SUCCESS:
			return {
				...state,
				fetchedMovie: movieAdapter(action.payload.fetchedMovie)
			};
		case SET_SEARCH_MOVIE:
			return {
				...state,
				moviesSearchInCreating: (action.payload.movies || []).map(movieAdapter)
			};
		case SET_SEARCH_MOVIE_TO_ADD:
			return {
				...state,
				moviesSearchAddMovieToStory: (action.payload.movies || []).map(
					movieAdapter
				),
				searchTitle: action.payload.searchTitle
			};
		case RESET_SEARCH_MOVIE:
			return {
				...state,
				moviesSearchInCreating: null
			};
		case LOADING:
			return {
				...state,
				isLoading: action.payload.loading
			};
		case SET_LOAD_MORE_MOVIE:
			return {
				...state,
				movieList: [
					...state.movieList,
					...(action.payload.movies || []).map(movieAdapter)
				]
			};
		case FETCH_REVIEW_BY_USER_MOVIE_ID_SUCCESS:
			return {
				...state,
				ownReview: action.payload.review
			};
		default:
			return state;
	}
}
