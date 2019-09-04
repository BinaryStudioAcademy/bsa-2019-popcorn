import {
	FETCH_USER_WATCH_LIST_SUCCESS,
	SAVE_WATCH_ITEM_SUCCESS,
	MOVE_WATCH_ITEM_TO_WATCHED,
	DELETE_WATCH_ITEM,
	FETCH_WATCH_LIST_STATUS_SUCCESS,
	ADD_MOVIE_TO_WATCH_LIST_SUCCESS,
	DELETE_MOVIE_FROM_WATCH_LIST_SUCCESS,
	DELETE_MOVIE_FROM_WATCH_LIST,
	ADD_MOVIE_TO_WATCH_LIST,
	FETCH_WATCH_LIST_IDS,
	FETCH_WATCH_LIST_IDS_SUCCESS
} from './actionTypes';
import movieAdapter from '../../MovieSeriesPage/movieAdapter';
import config from '../../../config';

interface IReducer {
	watchList?: any[];
	watchListStatus?: string;
	isLoading?: boolean;
	watchListIds?: any[];
}

const initialState: IReducer = {
	watchList: undefined,
	watchListStatus: undefined,
	isLoading: undefined,
	watchListIds: undefined
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_WATCH_LIST_SUCCESS:
			return {
				...state,
				watchList: formatWatchList(action.payload.watchList)
			};

		case SAVE_WATCH_ITEM_SUCCESS:
			const newMovie = formatMovieProp(action.payload);
			if (!newMovie) return { ...state };
			return {
				...state,
				watchList: [newMovie, ...state.watchList],
				watchListStatus: undefined
			};

		case FETCH_WATCH_LIST_IDS:
			return { ...state, isLoading: true };

		case FETCH_WATCH_LIST_IDS_SUCCESS:
			return {
				...state,
				isLoading: false,
				watchListIds: action.payload.watchListIds
			};

		case MOVE_WATCH_ITEM_TO_WATCHED:
			const prevWatchList = [...state.watchList];
			const putItem = prevWatchList.find(
				watch => watch.id === action.payload.watchId
			);
			putItem.status = 'watched';
			const index = prevWatchList.findIndex(
				watch => watch.id === action.payload.watchId
			);
			prevWatchList.splice(index, 1, putItem);
			return {
				...state,
				watchList: [...prevWatchList],
				watchListStatus: undefined
			};

		case DELETE_WATCH_ITEM:
			const watchList = [...state.watchList];
			return {
				...state,
				watchList: watchList.filter(
					watch => watch.id !== action.payload.watchId
				),
				watchListStatus: undefined
			};

		case FETCH_WATCH_LIST_STATUS_SUCCESS:
			return {
				...state,
				watchListStatus: action.payload.watchListStatus
			};

		case ADD_MOVIE_TO_WATCH_LIST:
			return {
				...state,
				isLoading: true
			};

		case ADD_MOVIE_TO_WATCH_LIST_SUCCESS:
			return {
				...state,
				watchListStatus: action.payload,
				watchList: undefined,
				isLoading: false
			};

		case DELETE_MOVIE_FROM_WATCH_LIST:
			return {
				...state,
				isLoading: true
			};

		case DELETE_MOVIE_FROM_WATCH_LIST_SUCCESS:
			return {
				...state,
				watchListStatus: action.payload.watchListStatus,
				watchList: undefined,
				isLoading: false
			};

		default:
			return state;
	}
};

const formatWatchList = watchList => {
	const tmpList = watchList.map(watch => {
		if (watch.movie) {
			const movie = movieAdapter(watch.movie);
			watch.movie = movie;
			return watch;
		}
		return;
	});
	return tmpList.filter(item => item !== undefined);
};

const formatMovieProp = movieProp => {
	const { movie, status, id } = movieProp;
	const newMovie = {
		id: movie.id,
		poster_path: config.POSTER_PATH + movie.poster_path,
		title: movie.title,
		runtime: movie.runtime,
		release_date: movie.release_date || null
	};
	return { id, movie: newMovie, status };
};
