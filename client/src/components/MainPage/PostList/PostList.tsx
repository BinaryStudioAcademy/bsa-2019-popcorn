import React from 'react';
import Post from '../Post/Post';
import { ReactComponent as FeedIcon } from '../../../assets/icons/general/newsFeed.svg';
import './PostList.scss';
import IComment from '../Post/IComment';
import IPost from '../Post/IPost';
import {
	addNewReaction,
	createReaction
} from '../FeedBlock/FeedBlock.redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IReaction from '../Post/IReaction';

interface IProps {
	posts: Array<IPost>;
	type?: string;
	styleCustom?: any;
	createComment?: (userId: string, text: string, postId: string) => any;
	addNewComment?: (comment: IComment) => any;
	userId: string;
	userRole: string;
	createReaction?: (type: string, userId: string, postId: string) => any;
	addNewReaction?: (reaction: IReaction) => any;
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
	addNewReaction
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostList);
