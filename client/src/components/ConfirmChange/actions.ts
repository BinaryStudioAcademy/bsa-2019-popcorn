import { CONFIRM_CHANGES } from './actionTypes';

export const confirmChanges = (token: string): any => {
	return {
		type: CONFIRM_CHANGES,
		payload: {
			token
		}
	};
};
