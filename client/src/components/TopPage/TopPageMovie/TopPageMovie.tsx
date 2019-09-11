import React from 'react';
import Image from '../../shared/Image/Image';
import config from '../../../config';
import { IMovie } from '../TopPage.service';

import './MovieListItem.scss';
import { NavLink } from 'react-router-dom';
import WatchListIcon from '../../shared/WatchListIcon/WatchListIcon';

interface ITopProps {
	index: number;
	movie: IMovie;
}

const TopPageMovie: React.SFC<ITopProps> = ({ index, movie }) => {
	if (!movie) {
		return <div />;
	}
	return (
		<div className="movie-list-container" key={index}>
			<div className="movie-key">
				<span className="movie-key-value">{index}.</span>
			</div>
			<div className="movie-item">
				<div className="movie-poster-wrp">
					<NavLink to={`/movies/${movie.id}`}>
						{' '}
						<Image
							src={movie.poster_path}
							defaultSrc={config.DEFAULT_MOVIE_IMAGE}
							alt="movie-poster"
							className="movie-poster"
						/>
						<WatchListIcon movieId={movie.id} />
					</NavLink>
				</div>
				<div className="movie-info">
					<NavLink to={`/movies/${movie.id}`}>
						<span className="movie-title">{movie.title}</span>
						<span className="movie-year">{` (${movie.release_date.slice(
							0,
							4
						)})`}</span>
					</NavLink>
					<div className="movie-genre">{movie.genres}</div>
					<span className="author-comment">{movie.comment}</span>
				</div>
			</div>
		</div>
	);
};

export default TopPageMovie;
