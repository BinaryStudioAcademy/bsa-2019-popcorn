import { CONTENT_SEARCH_SET_DATA } from './actionTypes';
import movieAdapter from '../../../MovieSeriesPage/movieAdapter';

const initialState: { data: null | Array<{ data: any; type: string }> } = {
	data: null
};

function adaptMoview(data) {
	return data.map(elem =>
		elem.type === 'movie'
			? { data: (elem.data || []).map(movieAdapter), type: 'movie' }
			: elem
	);
}

export default function(state = initialState, action) {
	switch (action.type) {
		case CONTENT_SEARCH_SET_DATA:
			return {
				...state,
				data: adaptMoview(action.payload.data)
			};
	}
	return state;
}
