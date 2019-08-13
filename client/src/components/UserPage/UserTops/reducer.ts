import { SET_TOP_IMAGE } from './actionTypes';

const initialState = {
	uploadUrl: null,
	urlForTop: null
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
		default:
			return state;
	}
}
