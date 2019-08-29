import React from 'react';
import Image from '../../shared/Image/Image';
import config from '../../../config';
import { IMovie } from '../TopPage.service';

import './MovieListItem.scss';

interface ITopProps {
	index: number;
	movie: IMovie;
}

const TopPageMovie: React.SFC<ITopProps> = ({ index, movie }) => {
	if (!movie) return <div />;
	return (
		<div className="movie-list-container" key={index}>
			<div className="movie-key">
				<span className="movie-key-value">{index}</span>
			</div>
			<div className="movie-item">
				<div className="movie-poster-wrp">
					<Image
						src={movie.poster_path}
						defaultSrc={config.DEFAULT_MOVIE_IMAGE}
						alt="movie-poster"
						className="movie-poster"
					/>
				</div>
				<div className="movie-info">
					<div>
						<span className="movie-title">{movie.title}</span>
						<span className="movie-year">{` (${movie.release_date.slice(
							0,
							4
						)})`}</span>
					</div>
					<div className="movie-genre">{movie.genres}</div>
					<span className="author-comment">{movie.comment}</span>
				</div>
			</div>
		</div>
	);
};

export default TopPageMovie;
