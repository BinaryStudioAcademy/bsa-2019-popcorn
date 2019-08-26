import { FETCH_USER_WATCH_LIST_SUCCESS } from './actionTypes';

interface IReducer {
	watchList?: Array<any>;
}

const initialState: IReducer = {
	watchList: undefined
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_WATCH_LIST_SUCCESS:
			return { ...state, watchList: action.payload.watchList };

		default:
			return state;
	}
};
