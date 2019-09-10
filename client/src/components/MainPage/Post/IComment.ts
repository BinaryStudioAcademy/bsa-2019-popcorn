export default interface IComment {
	id: string;
	user: {
		name: string;
		avatar: string;
		id: string
	};
	commentDate: string;
	text: string;
	parentId?: string;
}
