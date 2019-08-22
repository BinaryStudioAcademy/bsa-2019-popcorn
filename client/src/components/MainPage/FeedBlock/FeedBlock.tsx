import React, { useEffect } from 'react';
import PostList from '../PostList/PostList';
import RecommendList from '../RecommendList/RecommendList';
import './FeedBlock.scss';
import TopList from '../TopList/TopList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../../shared/Spinner';
import {
	addNewComment,
	addNewReaction,
	createComment,
	fetchPosts
} from './FeedBlock.redux/actions';
import StoryList from '../StoryList';
import { fetchStories } from '../StoryList/story.redux/actions';
import IComment from '../Post/IComment';
import SocketService from '../../../services/socket.service';
import IReaction from '../Post/IReaction';

interface IProps {
	posts: any;
	stories: any;
	fetchPosts: () => any;
	fetchStories: () => any;
	createComment: (userId: string, text: string, postId: string) => any;
	addNewComment: (comment: IComment) => any;
	addNewReaction?: (reactions: Array<IReaction>, postId: string) => any;
}
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
let wasAddedSockets = false;

const FeedBlock = (props: IProps) => {
	addSocket(props.addNewComment, props.addNewReaction);

	if (!props.posts) {
		props.fetchPosts();
	}
	if (!props.stories) {
		props.fetchStories();
	}
	return props.posts && props.stories ? (
		<div>
			<StoryList scrollStep={1} />
			<div className={'feed-block'}>
				<div>
					<PostList
						posts={props.posts}
						createComment={props.createComment}
						addNewComment={props.addNewComment}
					/>
				</div>
				<div>
					<RecommendList />
					<TopList />
				</div>
			</div>
		</div>
	) : (
		<Spinner />
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	posts: rootState.feed.posts,
	stories: rootState.story.stories
});

const actions = {
	fetchPosts,
	fetchStories,
	createComment,
	addNewComment,
	addNewReaction
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedBlock);
