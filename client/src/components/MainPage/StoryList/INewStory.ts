export default interface INewStory {
	image_url: null | string;
	caption: null | string;
	activity: null | { id: string; name: string };
	type: string;
}
