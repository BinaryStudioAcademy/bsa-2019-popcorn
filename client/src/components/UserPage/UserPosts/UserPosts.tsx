import React from 'react';
import PostList from '../../MainPage/PostList/PostList';
import Spinner from '../../shared/Spinner';
import PostConstructor from './PostConstructor';
import { connect } from 'react-redux';
import * as actions from '../../UserPage/actions';

interface IProps {
	userInfo?: any;
	userPosts?: any;
	loading: boolean;
	getUsersPosts: (userId: string) => any;
}

interface IState {}

class UserPosts extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {};
	}

	render() {
		if (this.props.loading) {
			this.props.getUsersPosts(this.props.userInfo.id);
		}

		return (
			<>
				{this.props.loading ? (
					<Spinner />
				) : (
					<div className="UserPosts">
						<div className="UserPostCreator">
							<PostConstructor userId={this.props.userInfo.id} />
						</div>
						<PostList posts={this.props.userPosts} />
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = rootState => ({
	userInfo: rootState.profile.profileInfo,
	userPosts: rootState.profile.userPosts,
	loading: rootState.profile.loading
});

const mapDispatchToProps = {
	...actions
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserPosts);
