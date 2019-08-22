import React from 'react';
import Post from '../Post/Post';
import { ReactComponent as FeedIcon } from '../../../assets/icons/general/newsFeed.svg';
import './PostList.scss';
import IComment from '../Post/IComment';
import IPost from '../Post/IPost';

interface IProps {
	posts: Array<IPost>;
	type?: string;
	styleCustom?: any;
	createComment?: (userId: string, text: string, postId: string) => any;
	addNewComment?: (comment: IComment) => any;
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
			{props.posts.map(post => {
				console.log(post);
				return (
					<Post
						key={post.id}
						post={{ ...post }}
						createComment={props.createComment}
						addNewComment={props.addNewComment}
					/>
				);
			})}
		</div>
	);
};

export default PostList;
