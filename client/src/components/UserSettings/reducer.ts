import { fetchUser } from '../../redux/routines';

const initialState = {
	profileInfo: null,
	erorr: null,
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case fetchUser.TRIGGER:
			return {
				...state,
				loading: true
			};
		case fetchUser.SUCCESS:
			return {
				...state,
				profileInfo: action.payload
			};
		case fetchUser.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case fetchUser.FULFILL:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}
