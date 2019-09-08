import { FINISH_FETCH_SEARCH_FILMS } from '../../shared/Header/actionTypes';
import {
	LOADING,
	RESET_SEARCH_MOVIE,
	SET_MOVIE_LIST,
	SET_MOVIE_SERIES,
	SET_SEARCH_MOVIE,
	SET_SEARCH_MOVIE_TO_ADD,
	FETCH_MOVIE_BY_ID_SUCCESS,
	SET_LOAD_MORE_MOVIE,
	FETCH_REVIEW_BY_USER_MOVIE_ID_SUCCESS,
	SET_REVIEW_SUCCESS,
	REMOVE_REVIEW_SET,
	SET_AWARDS,
	SET_FILTRED_MOVIE_LIST,
	SET_LOAD_MORE_FILTRED_MOVIE,
	SET_FILTERS,
	SET_SHOW_SPINNER,
	SET_HIDE_SPINNER,
	SET_GENRES,
	FETCH_STATISTICS,
	FETCH_STATISTICS_SUCCESS,
	FETCH_POSTS_BY_FILM_SUCCESS
} from './actionTypes';
import TMovie from '../TMovie';
import movieAdapter from '../movieAdapter';
import {
	ADD_NEW_COMMENT,
	ADD_NEW_REACTION
} from '../../MainPage/FeedBlock/FeedBlock.redux/actionTypes';
import findIndexInArray from '../../../helpers/findIndexInArray';

const initialState: {
	moviesSearch: Array<TMovie>;
	alreadySearch: boolean;
	movieList: null | Array<TMovie>;
	movieSeries: null | TMovie;
	fetchedMovie: null | TMovie;
	moviesSearchInCreating: null | Array<TMovie>;
	moviesSearchAddMovieToStory: null | Array<TMovie>;
	searchTitle: string;
	isLoading: boolean;
	ownReview: any;
	awards: any;
	movieSearchInAdvancedSearch: null | TMovie[];
	filters: any;
	showSpinner: boolean;
	genres: any;
	statistics: any;
	posts: any;
} = {
	moviesSearch: [],
	alreadySearch: false,
	movieList: null,
	movieSeries: null,
	moviesSearchInCreating: null,
	moviesSearchAddMovieToStory: null,
	isLoading: false,
	searchTitle: '',
	fetchedMovie: null,
	ownReview: null,
	awards: null,
	movieSearchInAdvancedSearch: null,
	filters: {
		nameValue: '',
		genresValues: [],
		ratingValues: [],
		yearValues: {
			startDate: '1900-01-01',
			endDate: '2100-01-01'
		},
		descriptionValue: '',
		castValues: '',
		crewValues: [],
		durationValues: []
	},
	showSpinner: false,
	genres: null,
	statistics: null,
	posts: null
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
		case SET_FILTRED_MOVIE_LIST:
			return {
				...state,
				showSpinner: false,
				movieSearchInAdvancedSearch: (action.payload.movies || []).map(
					movieAdapter
				)
			};
		case SET_MOVIE_SERIES:
			return {
				...state,
				movieSeries: action.payload.movie,
				awards: null,
				alreadySearch: true
			};
		case SET_AWARDS:
			return {
				...state,
				awards: action.payload.awards
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
		case SET_GENRES:
			return {
				...state,
				genres: action.payload.genres
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
		case SET_LOAD_MORE_FILTRED_MOVIE:
			return {
				...state,
				showSpinner: false,
				movieSearchInAdvancedSearch: (action.payload.movies || []).map(
					movieAdapter
				)
			};
		case SET_FILTERS:
			return {
				...state,
				filters: action.payload.filters
			};
		case SET_SHOW_SPINNER:
			return {
				...state,
				showSpinner: true
			};
		case SET_HIDE_SPINNER:
			return {
				...state,
				showSpinner: false
			};
		case FETCH_REVIEW_BY_USER_MOVIE_ID_SUCCESS:
			return {
				...state,
				ownReview: action.payload.review || { text: '' }
			};
		case SET_REVIEW_SUCCESS:
			return {
				...state,
				ownReview: null
			};
		case REMOVE_REVIEW_SET:
			return {
				...state,
				ownReview: null
			};
		case FETCH_STATISTICS:
			return {
				...state,
				showSpinner: true
			};
		case FETCH_STATISTICS_SUCCESS:
			return {
				...state,
				showSpinner: false,
				statistics: action.payload.statistics
			};
		case FETCH_POSTS_BY_FILM_SUCCESS:
			return {
				...state,
				showSpinner: false,
				posts: action.payload.posts
			};
		case ADD_NEW_COMMENT:
			if (!state.posts) return state;
			const posts = state.posts || new Array();
			const comment = action.payload.comment.comment;

			const index = findIndexInArray(posts, 'id', comment.post.id);
			if (index === -1) return state;
			const post = posts[index];
			if (!post.comments) post.comments = [comment];
			else post.comments.push(comment);
			return {
				...state,
				posts: [...posts]
			};
		case ADD_NEW_REACTION:
			if (!state.posts) return state;
			const postsForNewReact = state.posts || new Array();
			const { reactions, postId } = action.payload;

			const i = findIndexInArray(postsForNewReact, 'id', postId);
			if (i === -1) return state;
			const postForNewReact = postsForNewReact[i];
			postForNewReact.reactions = [...reactions];

			return {
				...state,
				posts: [...postsForNewReact]
			};
		default:
			return state;
	}
}
