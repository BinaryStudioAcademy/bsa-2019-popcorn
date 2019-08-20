export default interface IComment {
	id: string;
	author: string;
	commentDate: string;
	commentBody: string;
	parentId?: string;
}
