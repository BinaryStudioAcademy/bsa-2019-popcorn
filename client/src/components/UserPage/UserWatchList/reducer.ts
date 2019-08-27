import { FETCH_USER_WATCH_LIST_SUCCESS } from './actionTypes';
import movieAdapter from '../../MovieSeriesPage/movieAdapter';

interface IReducer {
	watchList?: Array<any>;
}

const initialState: IReducer = {
	watchList: undefined
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_WATCH_LIST_SUCCESS:
			return {
				...state,
				watchList: formatWatchList(action.payload.watchList)
			};

		default:
			return state;
	}
};

const formatWatchList = watchList =>
	watchList.map(watch => {
		if (watch.movie) {
			const movie = movieAdapter(watch.movie);
			watch.movie = movie;
			return watch;
		}
	});
