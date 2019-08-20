import { SET_TOP_IMAGE, SET_ElASTIC_MOVIE_LIST } from './actionTypes';

const initialState = {
	uploadUrl: null,
	urlForTop: null,
	alreadySearch: false,
	elasticSearchMovies: null
};
export default function(state = initialState, action) {
	switch (action.type) {
		case SET_TOP_IMAGE: {
			let { uploadUrl, topId } = action.payload;
			return {
				...state,
				uploadUrl,
				urlForTop: topId
			};
		}
		case SET_ElASTIC_MOVIE_LIST: {
			let { elasticSearchMovies } = action.payload;
			return {
				...state,
				elasticSearchMovies,
				alreadySearch: true
			};
		}
		default:
			return state;
	}
}
