import callWebApi from './webApi.service';

export const getUser = async () => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: '/api/auth/user'
	});
	return res;
};

export const updateEmail = async (userId: string, email: string) => {
	const token =
		Math.random()
			.toString(36)
			.substring(2, 15) +
		Math.random()
			.toString(36)
			.substring(2, 15);
	const body = { email, token };

	const res = await callWebApi({
		method: 'PUT',
		endpoint: `/api/user/email/${userId}`,
		body
	});
	return res;
};

export const updatePassword = async (userId: string, password: string) => {
	const token =
		Math.random()
			.toString(36)
			.substring(2, 15) +
		Math.random()
			.toString(36)
			.substring(2, 15);
	const body = { password, token };
	const res = await callWebApi({
		method: 'PUT',
		endpoint: `/api/user/password/${userId}`,
		body
	});
	return res;
};

export const deleteUser = async (userId: string) => {
	const res = await callWebApi({
		method: 'DELETE',
		endpoint: `/api/user/${userId}`
	});
	return res;
};

export const updateNotificationSettings = async (
	userId: string,
	data: object
) => {
	const body = data;
	const res = await callWebApi({
		method: 'PUT',
		endpoint: `/api/user/notifications/${userId}`,
		body
	});
	return res;
};

export const updatePrivacySettings = async (userId: string, data: object) => {
	const body = data;
	const res = await callWebApi({
		method: 'PUT',
		endpoint: `/api/user/privacy/${userId}`,
		body
	});
	return res;
};
