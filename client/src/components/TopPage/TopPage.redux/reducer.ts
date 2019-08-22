import * as ActionTypes from './actionTypes';

interface IStateTops {
	top: any;
}

const initialState: IStateTops = {
	top: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SET_TOP: {
			return {
				...state,
				top: action.payload.top
			};
		}
		default:
			return state;
	}
}
