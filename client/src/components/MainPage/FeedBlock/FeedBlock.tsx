import React from 'react';
import PostList from '../PostList/PostList';
import RecommendList from '../RecommendList/RecommendList';
import './FeedBlock.scss';
import TopList from '../TopList/TopList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../../shared/Spinner';
import { fetchPosts } from './FeedBlock.redux/actions';
import StoryList from '../StoryList';
import { fetchStories } from '../StoryList/story.redux/actions';

interface IProps {
	posts: any;
	stories: any;
	fetchPosts: () => any;
	fetchStories: () => any;
}

const FeedBlock = (props: IProps) => {
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
					<PostList posts={props.posts} />
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
	fetchStories
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedBlock);
