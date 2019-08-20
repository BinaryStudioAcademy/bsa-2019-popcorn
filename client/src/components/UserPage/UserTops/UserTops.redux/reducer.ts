import * as ActionTypes from './actionTypes';

const initialState = {
	uploadUrl: null,
	urlForTop: null,
	alreadySearch: false,
	elasticSearchMovies: null,
	topList: new Array()
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SET_TOP_IMAGE: {
			let { uploadUrl, topId } = action.payload;
			return {
				...state,
				uploadUrl,
				urlForTop: topId
			};
		}
		case ActionTypes.SET_ElASTIC_MOVIE_LIST: {
			let { elasticSearchMovies } = action.payload;
			return {
				...state,
				elasticSearchMovies,
				alreadySearch: true
			};
		}
		case ActionTypes.SET_TOPS: {
			return {
				...state,
				topList: [...action.payload.topList]
			};
		}
		case ActionTypes.ADD_TOP_SUCCESS: {
			return {
				...state,
				topList: [...state.topList, action.payload.newTop]
			};
		}
		case ActionTypes.UPDATE_TOP_SUCCESS: {
			const updatedTop = action.payload.updatedTop;
			const topList = Object.assign([], state.topList);

			const updatedTopList = topList.map((top: any) => {
				if (top.id == updatedTop.id) {
					return updatedTop;
				}
				return top;
			});

			return {
				...state,
				topList: [...updatedTopList]
			};
		}
		case ActionTypes.DELETE_TOP_SUCCESS: {
			const topId = action.payload.topId;
			const topList = Object.assign([], state.topList);
			const newTopList = topList.filter((top: any) => top.id != topId);

			return {
				...state,
				topList: [...newTopList]
			};
		}
		case ActionTypes.FINISH_SEARCH_ELASTIC_FILMS: {
			return {
				...state,
				elasticSearchMovies: [],
				alreadySearch: false
			};
		}
		default:
			return state;
	}
}
