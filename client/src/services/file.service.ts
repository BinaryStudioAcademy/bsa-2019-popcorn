export const uploadFile = async (file: FormData) => {
	const response = await fetch(`/api/image/upload`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		},
		method: 'POST',
		body: file
	});
	return await response.json();
};
