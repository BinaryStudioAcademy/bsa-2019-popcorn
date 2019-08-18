import React from 'react';
import PostList from '../../MainPage/PostList/PostList';
import Spinner from '../../shared/Spinner';
interface IProps {
	posts?: any;
	getUsersPosts: () => any;
}
const userPostStyle = {
	marginRight: '0px',
	paddingRight: '0px',
	marginTop: '40px'
};
const UserPosts: React.FC<IProps> = ({ posts, getUsersPosts }) => {
	if (!posts) {
		getUsersPosts();
		return <Spinner />;
	}
	return (
		<div className="UserPosts">
			{posts ? (
				<PostList styleCustom={userPostStyle} type="userPosts" posts={posts} />
			) : (
				<div className="no-info-yet">No posts yet</div>
			)}
		</div>
	);
};

export default UserPosts;
