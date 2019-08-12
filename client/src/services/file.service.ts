import config from './../config';

export const uploadFile = async (file: FormData) => {
	let response = await fetch(`${config.API_URL}/api/image/upload`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		},
		method: 'POST',
		body: file
	});
	return await response.json();
};
