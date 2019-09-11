import React, { useState } from 'react';
import Post from '../Post/Post';
import './PostList.scss';
import IComment from '../Post/IComment';
import IPost from '../Post/IPost';
import {
	addNewComment,
	addNewPost,
	addNewReaction,
	createComment,
	createReaction,
	deletePost,
	deletePostFromList,
	updatePost
} from '../FeedBlock/FeedBlock.redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IReaction from '../Post/IReaction';
import SocketService from '../../../services/socket.service';
import PostConstructor, {
	INewPost
} from '../../UserPage/UserPosts/PostConstructor';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
	posts: IPost[];
	type?: string;
	styleCustom?: any;
	createComment: (userId: string, text: string, postId: string) => any;
	addNewComment: (comment: IComment) => any;
	userId: string;
	userRole: string;
	createReaction: (type: string, userId: string, postId: string) => any;
	addNewReaction: (reaction: IReaction) => any;
	deletePost: (id: string, userId: string) => any;
	deletePostFromList: (id: string) => any;
	updatePost: (post: IPost) => any;
	addNewPost: (post: IPost) => any;
	updateUsersPosts?: () => any;
}

let wasAddedSockets = false;
const addSocket = (
	addNewComment,
	addNewReaction,
	deletePostFromList,
	updatePost,
	addNewPost
) => {
	if (wasAddedSockets) {
		return;
	}
	SocketService.on(
		'new-comment',
		comment => addNewComment && addNewComment(comment)
	);
	SocketService.on('new-reaction', obj => {
		addNewReaction && addNewReaction(obj.reactions, obj.postId);
	});
	SocketService.on('delete-post', postId => {
		deletePostFromList && deletePostFromList(postId);
	});
	SocketService.on('update-post', post => {
		if (post) {
			updatePost && updatePost(post);
		}
	});

	SocketService.on('new-post', post => {
		addNewPost && addNewPost(post);
	});
	wasAddedSockets = true;
};

const PostList = (props: IProps) => {
	const [
		showPostsConstructor,
		setShowPostsConstructor
	] = useState<null | INewPost>(null);
	const togglePostConstructor = ev => {
		ev.preventDefault();
		setShowPostsConstructor(
			showPostsConstructor
				? null
				: {
						image_url: '',
						description: '',
						title: 'test title',
						userId: props.userId,
						extraLink: '',
						extraTitle: '',
						extraData: null,
						extraType: '',
						modalExtra: false,
						croppedSaved: false,
						reactions: [],
						comments: [],
						movieSearchTitle: null,
						createdAt: ''
				  }
		);
	};
	addSocket(
		props.addNewComment,
		props.addNewReaction,
		props.deletePostFromList,
		props.updatePost,
		props.addNewPost
	);
	return (
		<div className="feed-list" style={props.styleCustom}>
			{props.type === 'userPosts' ? null : (
				<div className="feed-heading">
					<div
						className="feedAddPost"
						onClick={ev => togglePostConstructor(ev)}
					>
						<FontAwesomeIcon className="feedAddPostIcon" icon={faPlusCircle} />
					</div>
					<span>Add post</span>
				</div>
			)}
			{showPostsConstructor && (
				<PostConstructor
					userId={props.userId}
					saveCropped={() => {}}
					croppedSaved={false}
					togglePostConstructor={togglePostConstructor}
					newPost={showPostsConstructor}
				/>
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
							deletePost={(id: string, userId: string) => {
								props.deletePost(id, userId);
								if (props.updateUsersPosts) {
									props.updateUsersPosts();
								}
							}}
							setShowPostsConstructor={setShowPostsConstructor}
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
	updatePost,
	createReaction,
	addNewReaction,
	deletePost,
	addNewComment,
	createComment,
	deletePostFromList,
	addNewPost
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostList);
