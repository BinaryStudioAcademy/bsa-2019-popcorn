export default function(str: string, insert: string) {
	const index = str.indexOf('$');
	if (index === -1) {
		return str;
	}
	const end =
		str.indexOf(' ', index) === -1 ? str.length : str.indexOf(' ', index);
	return str.slice(0, index) + insert + str.slice(end);
}
