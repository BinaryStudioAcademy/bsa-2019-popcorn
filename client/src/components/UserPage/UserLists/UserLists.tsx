import React from 'react';
import './UserLists.scss';
import MovieListCreator from './MovieListCreator/MovieListCreator';

export interface INewMovieList {
	title: string;
	isPrivate: boolean;
	despription?: string;
	image_url?: string;
	moviesId: string[];
}

const UserLists: React.FC = () => {
	const saveMovieList = (movieList: INewMovieList) => {
		console.log(movieList);
	};

	return (
		<div className="UserLists">
			<MovieListCreator saveMovieList={movieList => saveMovieList(movieList)} />
		</div>
	);
};

export default UserLists;
