import React, { useState, useEffect } from 'react';
import PostList from '../../MainPage/PostList/PostList';
import Spinner from '../../shared/Spinner';
import CreateExtraBtn from "../../shared/CreateExtraBtn";
import PostConstructor from './PostConstructor';
interface IProps {
	posts?: any;
	getUsersPosts: () => any;
	userId: string;
	croppedSaved: boolean;
	saveCropped: () => void;
	isOwnData: boolean;
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
	isOwnData
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
			{isOwnData && (
				<CreateExtraBtn
					handleClick={ev => togglePostConstructor(ev)}
					body={'Create post'}
				/>
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
