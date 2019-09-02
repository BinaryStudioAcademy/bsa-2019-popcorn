import React, { useState } from 'react';
import './MovieListCreator.scss';
import { INewMovieList } from '../UserLists';
import ImageLoader from './ImageLoader/ImageLoader';

interface IProps {
	saveMovieList: (movieList: INewMovieList) => void;
}

const MovieListCreator: React.FC<IProps> = () => {
	const [imageUrl, setImageUrl] = useState('');

	return (
		<div className="MovieListCreator">
			<ImageLoader setImageUrl={setImageUrl} />
			<img className="movie-list-img" src={imageUrl} />
		</div>
	);
};

export default MovieListCreator;
