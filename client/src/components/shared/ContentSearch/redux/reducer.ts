import { CONTENT_SEARCH_SET_DATA } from './actionTypes';

const initialState: { data: null | Array<{ data: any; type: string }> } = {
	data: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case CONTENT_SEARCH_SET_DATA:
			return {
				...state,
				data: action.payload.data
			};
	}
	return state;
}
