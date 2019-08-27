import {
	SEARCH_MOVIE_TITLE_SUCCESS,
	SEARCH_MOVIE_TITLE,
	DELETE_SEARCH_DATA,
	FETCH_MOVIE_PROPERTIES_SUCCESS,
	DELETE_SELECTED_MOVIE
} from './actionTypes';
import movieAdapter from '../../MovieSeriesPage/movieAdapter';

interface IState {
	searchData?: Array<IMovieTitles>;
	isLoading?: boolean;
	selectMovie?: any;
}
interface IMovieTitles {
	id: string;
	title: string;
}

const initialState = {
	searchData: undefined,
	isLoading: false,
	selectMovie: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SEARCH_MOVIE_TITLE_SUCCESS:
			return {
				...state,
				searchData: action.payload.searchData,
				isLoading: false
			};
		case SEARCH_MOVIE_TITLE:
			return { ...state, isLoading: true };
		case DELETE_SEARCH_DATA:
			return { ...state, searchData: undefined };
		case FETCH_MOVIE_PROPERTIES_SUCCESS:
			return { ...state, selectMovie: action.payload.movie };
		case DELETE_SELECTED_MOVIE:
			return { ...state, selectMovie: undefined };
		default:
			return state;
	}
};
