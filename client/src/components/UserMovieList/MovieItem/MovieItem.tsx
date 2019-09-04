import React from 'react';
import { IMovie } from '../UserMovieList';
import './MovieItem.scss';
import Image from '../../shared/Image/Image';
import config from '../../../config';
import { NavLink } from 'react-router-dom';

interface IProps {
	movie: IMovie;
}

const MovieItem: React.FC<IProps> = ({ movie }) => {
	const {
		id,
		title,
		poster_path,
		release_date,
		runtime,
		overview,
		genres
	} = movie;

	return (
		<div className="MovieItem">
			<NavLink to={`/movies/${id}`} className="movie-item-image-container">
				<Image
					src={`${config.POSTER_PATH}/${poster_path}`}
					defaultSrc={config.DEFAULT_MOVIE_IMAGE}
					alt="movie-poster"
				/>
			</NavLink>
			<div className="movie-item-main">
				<NavLink to={`/movies/${id}`} className="movie-item-title">
					{title}
					<span className="movie-item-date">
						{release_date ? ' (' + release_date.slice(0, 4) + ')' : null}
					</span>
				</NavLink>
				<div className="movie-item-duration-genres">
					{runtime && <span className="duration">{`${runtime} min`}</span>}
					<span className="border-element">{' | '}</span>
					<span className="genres">{genres.join(', ')}</span>
				</div>
				<div className="movie-item-overview">{overview}</div>
			</div>
		</div>
	);
};

export default MovieItem;
