export default (array, key, value) => {
	for (let i = 0; i < array.length; i++) if (array[i][key] === value) return i;
	return -1;
};
