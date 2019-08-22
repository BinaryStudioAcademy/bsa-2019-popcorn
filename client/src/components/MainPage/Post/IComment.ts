export default interface IComment {
	id: string;
	user: {
		name: string;
		avatar: string;
	};
	commentDate: string;
	text: string;
	parentId?: string;
}
