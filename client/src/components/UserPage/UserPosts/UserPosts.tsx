import React, { useState, useEffect } from 'react';
import PostList from '../../MainPage/PostList/PostList';
import Spinner from '../../shared/Spinner';
import PostConstructor from './PostConstructor';
import { connect } from 'react-redux';
import * as actions from '../../UserPage/actions';
import './UserPosts.scss';
interface IProps {
	posts?: any;
	getUsersPosts: () => any;
	userId: string;
	croppedSaved: boolean;
	saveCropped: () => void;
	currentUserId: string;
}
const userPostStyle = {
	marginRight: '0px',
	paddingRight: '0px',
	marginTop: '40px'
};
const UserPosts: React.FC<IProps> = ({
	posts,
	getUsersPosts,
	userId,
	croppedSaved,
	saveCropped,
	currentUserId
}) => {
	const [showPostsConstructor, setShowPostsConstructor] = useState(false);
	if (!posts) {
		getUsersPosts();
		return <Spinner />;
	}
	const togglePostConstructor = ev => {
		ev.preventDefault();
		setShowPostsConstructor(!showPostsConstructor);
	};
	return (
		<div className="UserPosts">
			{currentUserId === userId && (
				<button
					className="create-post-btn hover"
					onClick={ev => togglePostConstructor(ev)}
				>
					Create post
				</button>
			)}
			{showPostsConstructor && (
				<PostConstructor
					userId={userId}
					saveCropped={saveCropped}
					croppedSaved={croppedSaved}
					togglePostConstructor={togglePostConstructor}
				/>
			)}
			{posts.length === 0 ? (
				<div className="no-info-yet">No posts yet</div>
			) : (
				<PostList styleCustom={userPostStyle} type="userPosts" posts={posts} />
			)}
		</div>
	);
};

export default UserPosts;
