import {
	CONTENT_SEARCH_FETCH_DATA,
	CONTENT_SEARCH_SET_DATA
} from './actionTypes';
import movieAdapter from '../../../MovieSeriesPage/movieAdapter';

const initialState: {
	data: null | Array<{ data: any; type: string }>;
	loading: boolean;
	error: string;
} = {
	data: null,
	loading: false,
	error: ''
};

function adaptMovie(data) {
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
				data: adaptMovie(action.payload.data),
				loading: false,
				error: action.payload.error
			};
		case CONTENT_SEARCH_FETCH_DATA:
			return {
				...state,
				loading: true,
				data: [],
				error: ''
			};
	}
	return state;
}
