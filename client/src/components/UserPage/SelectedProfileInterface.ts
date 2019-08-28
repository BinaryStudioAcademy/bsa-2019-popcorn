export default interface ISelectedProfileInfo {
	id: string;
	name: string;
	male: boolean;
	female: boolean;
	location: string;
	aboutMe: string;
	avatar: string;
	favoriteLists: Array<{ movie: { id: number; name: string } }>;
}
