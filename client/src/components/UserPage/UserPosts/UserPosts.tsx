import React from 'react';
import PostList from '../../MainPage/PostList/PostList';
import Spinner from '../../shared/Spinner';
interface IProps {
	posts?: any; // todo
	getUsersPosts: () => any;
}

const UserPosts: React.FC<IProps> = ({ posts, getUsersPosts }) => {
	if (!posts) {
		getUsersPosts();
		return <Spinner />;
	}
	return (
		<div className="UserPosts">
			<PostList posts={posts} />
		</div>
	);
};

export default UserPosts;
