import React, { useEffect } from 'react';
import PostList from '../../MainPage/PostList/PostList';

interface IProps {
	fetchPostsByFilm: () => void;
	posts?: Array<any>;
}

const MovieSeriesPosts: React.FC<IProps> = ({ fetchPostsByFilm, posts }) => {
	useEffect(() => {
		fetchPostsByFilm();
	}, []);
	return (
		<div className="MovieSeriesPosts">
			{' '}
			<PostList posts={posts} />{' '}
		</div>
	);
};

export default MovieSeriesPosts;
