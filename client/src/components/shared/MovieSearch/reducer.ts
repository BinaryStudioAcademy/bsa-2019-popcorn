import {
	SEARCH_MOVIE_TITLE_SUCCESS,
	SEARCH_MOVIE_TITLE,
	DELETE_SEARCH_DATA
} from './actionTypes';

interface IState {
	searchData?: Array<IMovieTitles>;
	isLoading?: boolean;
}
interface IMovieTitles {
	id: string;
	title: string;
}

const initialState = {
	searchData: undefined,
	isLoading: false
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
		default:
			return state;
	}
};
