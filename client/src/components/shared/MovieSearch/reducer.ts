import { SEARCH_MOVIE_TITLE_SUCCESS } from './actionTypes';

interface IState {
	searchData?: Array<IMovieTitles>;
}
interface IMovieTitles {
	id: string;
	title: string;
}

const initialState = {
	searchData: undefined
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SEARCH_MOVIE_TITLE_SUCCESS:
			return { ...state, searchData: action.payload.searchData };
		default:
			return state;
	}
};
