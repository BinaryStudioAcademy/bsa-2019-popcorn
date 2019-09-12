import {
	GET_UNREAD_NOTIFICATIONS_SUCCESS,
	GET_FIREBASE_TOKEN_SUCCESS,
	SET_FIREBASE_TOKEN_UNDEFINED,
	FETCH_ADVICE,
	SET_ADVICE,
	SET_NEW_RATE_INFO
} from './actionTypes';
import movieAdapter from '../../MovieSeriesPage/movieAdapter';

const initialState = {
	unreadNotifications: [],
	firebaseToken: undefined,
	loading: false,
	movieAdvice: undefined
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_UNREAD_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				unreadNotifications: action.payload.unreadNotifications
			};
		case GET_FIREBASE_TOKEN_SUCCESS:
			return {
				...state,
				firebaseToken: action.payload.firebaseToken
			};
		case SET_FIREBASE_TOKEN_UNDEFINED:
			return {
				...state,
				firebaseToken: undefined
			};
		case FETCH_ADVICE:
			return {
				...state,
				loading: true,
				movieAdvice: []
			};
		case SET_ADVICE:
			return {
				...state,
				loading: false,
				movieAdvice: (action.payload.movieAdvice || []).map(movieAdapter)
			};

		case SET_NEW_RATE_INFO:
			const prevAdvice: any[] =
				(state.movieAdvice && [...(state.movieAdvice as any)]) || [];
			const { rateInfo } = action.payload;
			prevAdvice.forEach((advice, index) => {
				if (advice.id == rateInfo.movieid) {
					const newAdviceItem = { ...advice };
					newAdviceItem.rateInfo = rateInfo;
					prevAdvice.splice(index, 1, newAdviceItem);
				}
			});
			return {
				...state,
				movieAdvice: [...prevAdvice]
			};

		default:
			return state;
	}
};
