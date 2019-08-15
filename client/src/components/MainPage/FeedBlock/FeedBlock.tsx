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

interface IProps {
	posts: any;
	fetchPosts: () => any;
}

const FeedBlock = (props: IProps) => {
	if (!props.posts) {
		props.fetchPosts();
	}

	return props.posts ? (
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
	posts: rootState.feed.posts
});

const actions = {
	fetchPosts
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedBlock);
