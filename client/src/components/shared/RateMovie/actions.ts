import {
	FETCH_USER_RATES,
	SAVE_USER_RATE,
	DELETE_USER_RATE
} from './actionTypes';

export const fetchUserRates = () => ({
	type: FETCH_USER_RATES
});

export const saveUserRate = userRate => ({
	type: SAVE_USER_RATE,
	payload: { userRate }
});

export const deleteUserRate = userRate => ({
	type: DELETE_USER_RATE,
	payload: { userRate }
});
