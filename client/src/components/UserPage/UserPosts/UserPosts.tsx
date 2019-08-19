import React from 'react';
import PostList from '../../MainPage/PostList/PostList';
import Spinner from '../../shared/Spinner';
import PostConstructor from './PostConstructor';

interface IProps {
	posts?: any; // todo
	getUsersPosts: () => any;
}

interface IState {}

class UserPosts extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
	}

	render() {
		if (!this.props.posts) {
			this.props.getUsersPosts();
			return <Spinner />;
		}

		return (
			<div className="UserPosts">
				<div className="UserPostCreator">
					<PostConstructor />
				</div>
				<PostList posts={this.props.posts} />
			</div>
		);
	}
}

export default UserPosts;
