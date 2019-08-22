import * as ActionTypes from './actionTypes';

export const fetchTop = (topId: string) => {
	return {
		type: ActionTypes.FETCH_TOP,
		payload: {
			topId
		}
	};
};
