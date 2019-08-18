export default function(runtime: number) {
	if (!runtime || runtime <= 0) {
		return null;
	}
	const minutes = runtime % 60;
	const hours = Math.floor(runtime / 60);
	const mm = minutes < 10 ? `0${minutes}` : minutes;
	const hh = hours < 10 ? `0${hours}` : hours;
	return `${hh}:${mm}`;
}
