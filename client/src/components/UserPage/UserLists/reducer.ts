import {
	FETCH_MOVIE_LISTS_PREVIEW,
	FETCH_MOVIE_LISTS_PREVIEW_SUCCESS
} from './actionTypes';

interface IReducerState {
	isLoading: boolean;
	movieListsPreview?: Array<any>; // TODO SHOW REAL interface
}

const initialState: IReducerState = {
	isLoading: false,
	movieListsPreview: undefined
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MOVIE_LISTS_PREVIEW:
			return { ...state, isLoading: true };

		case FETCH_MOVIE_LISTS_PREVIEW_SUCCESS:
			return {
				...state,
				isLoading: false,
				movieListsPreview: action.payload.movieListsPreview
			};

		default:
			return state;
	}
};
