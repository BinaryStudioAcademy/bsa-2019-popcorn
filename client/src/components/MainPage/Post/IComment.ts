export default interface IComment {
	id: string;
	user: {
		name: string;
	};
	commentDate: string;
	text: string;
	parentId?: string;
}
