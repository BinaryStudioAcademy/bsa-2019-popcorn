export const uploadFile = async (file: FormData) => {
	let response = await fetch('http://localhost:5000/api/image/upload', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		},
		method: 'POST',
		body: file
	});
	return await response.json();
};
