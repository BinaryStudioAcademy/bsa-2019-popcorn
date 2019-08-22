import IComment from './IComment';
import IReaction from './IReaction';

export default interface IPost {
	id: string;
	user: {
		name: string;
		avatar: string;
		id: string;
		any;
	};
	created_At?: string;
	image_url: string;
	description?: string;
	content?: {
		image: string;
		link: string;
		description: string;
	};
	comments?: Array<IComment>;
	tags?: {
		id: string;
		tagName: string;
	}[];
	reactions: Array<IReaction>;
}
