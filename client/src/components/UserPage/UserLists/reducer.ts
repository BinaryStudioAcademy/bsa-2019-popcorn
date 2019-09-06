import {
	FETCH_MOVIE_LISTS_PREVIEW,
	FETCH_MOVIE_LISTS_PREVIEW_SUCCESS,
	DELETE_MOVIE_LIST,
	SAVE_MOVIE_LIST_SUCCESS,
	SAVE_MOVIE_LIST,
	FETCH_MOVIE_LIST_DETAILS,
	FETCH_MOVIE_LIST_DETAILS_SUCCESS,
	FETCH_ALL_MOVIE_LISTS,
	FETCH_ALL_MOVIE_LISTS_SUCCESS
} from './actionTypes';

interface IReducerState {
	isLoading: boolean;
	movieListsPreview?: any[];
	movieListDetails?: any;
	selectedPreviewUserId?: string;
	allMovieLists?: any[];
}

const initialState: IReducerState = {
	isLoading: false,
	movieListsPreview: undefined,
	movieListDetails: undefined,
	selectedPreviewUserId: undefined,
	allMovieLists: undefined
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MOVIE_LISTS_PREVIEW:
			return { ...state, isLoading: true };

		case FETCH_MOVIE_LISTS_PREVIEW_SUCCESS:
			return {
				...state,
				isLoading: false,
				movieListsPreview: action.payload.movieListsPreview,
				selectedPreviewUserId: action.payload.selectedPreviewUserId
			};

		case DELETE_MOVIE_LIST:
			const { movieListId } = action.payload;
			const prevMovieList = [...state.movieListsPreview];
			return {
				...state,
				movieListsPreview: prevMovieList.filter(
					movieList => movieList.id !== movieListId
				),
				allMovieLists: undefined
			};

		case SAVE_MOVIE_LIST:
			return {
				...state,
				isLoading: true
			};

		case SAVE_MOVIE_LIST_SUCCESS:
			return {
				...state,
				movieListsPreview: [
					action.payload.newMovieList,
					...state.movieListsPreview
				],
				isLoading: false,
				allMovieLists: undefined
			};

		case FETCH_MOVIE_LIST_DETAILS:
			return {
				...state,
				isLoading: true
			};

		case FETCH_MOVIE_LIST_DETAILS_SUCCESS:
			return {
				...state,
				isLoading: false,
				movieListDetails: action.payload.movieListDetails
			};

		case FETCH_ALL_MOVIE_LISTS:
			return {
				...state,
				isLoading: true
			};

		case FETCH_ALL_MOVIE_LISTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				allMovieLists: action.payload.allMovieLists
			};

		case FETCH_ALL_MOVIE_LISTS_SUCCESS:
			return {
				...state,
				allMovieLists: action.payload
			};

		default:
			return state;
	}
};
