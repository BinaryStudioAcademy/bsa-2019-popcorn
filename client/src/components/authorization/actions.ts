import {
	LOGOUT,
	FETCH_LOGIN,
	FETCH_USER_BY_TOKEN,
	FETCH_REGISTRATION,
	FETCH_RESET_PASSWORD,
	FETCH_RESTORE_PASSWORD,
	AUTH_WITH_GOOGLE
} from './actionTypes';
import uuid from 'uuid/v4';

interface IValues {
	email: string;
	password: string;
}

interface IValuesWithName {
	email: string;
	password: string;
	name: string;
}

export const authorize = (values: IValues): any => {
	return {
		type: FETCH_LOGIN,
		payload: {
			...values
		}
	};
};

export const unauthorize = (): any => {
	return {
		type: LOGOUT
	};
};

export const fetchByToken = (token: string): any => {
	return {
		type: FETCH_USER_BY_TOKEN,
		payload: {
			token
		}
	};
};

export const registration = (value: IValuesWithName): any => {
	const user = {
		id: uuid(),
		...value,
		location: '',
		aboutMe: '',
		tops: []
	};

	return {
		type: FETCH_REGISTRATION,
		payload: user
	};
};

export const fetchResetPassword = (email: string): any => {
	return {
		type: FETCH_RESET_PASSWORD,
		payload: {
			email
		}
	};
};

export const fetchRestorePassword = (password: string, token: string): any => {
	return {
		type: FETCH_RESTORE_PASSWORD,
		payload: {
			password,
			token
		}
	};
};

export const authWithGoogle = (redirect_url: string) => {
	return {
		type: AUTH_WITH_GOOGLE,
		payload: {
			redirect_url
		}
	};
};
