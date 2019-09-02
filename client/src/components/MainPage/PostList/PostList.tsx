import React from 'react';
import Post from '../Post/Post';
import { ReactComponent as FeedIcon } from '../../../assets/icons/general/newsFeed.svg';
import './PostList.scss';
import IComment from '../Post/IComment';
import IPost from '../Post/IPost';
import {
	addNewReaction,
	createReaction,
	deletePost,
	addNewComment,
	createComment
} from '../FeedBlock/FeedBlock.redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IReaction from '../Post/IReaction';
import SocketService from '../../../services/socket.service';

interface IProps {
	posts: Array<IPost>;
	type?: string;
	styleCustom?: any;
	createComment: (userId: string, text: string, postId: string) => any;
	addNewComment: (comment: IComment) => any;
	userId: string;
	userRole: string;
	createReaction: (type: string, userId: string, postId: string) => any;
	addNewReaction: (reaction: IReaction) => any;
	deletePost: (id: string, userId: string) => any;
}
let wasAddedSockets = false;
const addSocket = (addNewComment, addNewReaction) => {
	if (wasAddedSockets) return;
	SocketService.on(
		'new-comment',
		comment => addNewComment && addNewComment(comment)
	);
	SocketService.on('new-reaction', obj => {
		addNewReaction && addNewReaction(obj.reactions, obj.postId);
	});
	wasAddedSockets = true;
};

const PostList = (props: IProps) => {
	// console.log(props.posts);
	addSocket(props.addNewComment, props.addNewReaction);
	return (
		<div className="feed-list" style={props.styleCustom}>
			{props.type === 'userPosts' ? null : (
				<div className="feed-heading">
					<FeedIcon />
					<span>News feed</span>
				</div>
			)}
			{props.posts &&
				props.posts.map(post => {
					return (
						<Post
							key={post.id}
							post={post}
							createComment={props.createComment}
							createReaction={props.createReaction}
							addNewComment={props.addNewComment}
							addNewReaction={props.addNewReaction}
							userId={props.userId}
							userRole={props.userRole}
							deletePost={props.deletePost}
						/>
					);
				})}
		</div>
	);
};
const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id,
	userRole: rootState.profile.profileInfo.role
});

const actions = {
	createReaction,
	addNewReaction,
	deletePost,
	addNewComment,
	createComment
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostList);
