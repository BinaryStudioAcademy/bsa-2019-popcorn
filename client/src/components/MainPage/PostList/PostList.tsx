import React from 'react';
import Post from '../Post/Post';
import { ReactComponent as FeedIcon } from '../../../assets/icons/general/newsFeed.svg';
import './PostList.scss';

type post = {
	id: string;
	user: {
		name: string;
		avatar: string;
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
	comments?: {
		id: string;
		author: string;
		commentDate: string;
		commentBody: string;
	}[];
	tags?: {
		id: string;
		tagName: string;
	}[];
};
interface IProps {
	posts: Array<post>;
	type?: string;
	styleCustom?: any;
}

const PostList = (props: IProps) => {
	return (
		<div className="feed-list" style={props.styleCustom}>
			{props.type === 'userPosts' ? null : (
				<div className="feed-heading">
					<FeedIcon />
					<span>News feed</span>
				</div>
			)}
			{props.posts.map(post => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
};

export default PostList;
