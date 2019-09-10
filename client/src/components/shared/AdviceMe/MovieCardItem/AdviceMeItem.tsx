import React, { useState, ObjectHTMLAttributes } from 'react';
import './AdviceMeItem.scss';
import config from '../../../../config';
import Image from '../../Image/Image';
import TMovie from '../../../MovieSeriesPage/TMovie';
import WatchListIcon from '../../WatchListIcon/WatchListIcon';
import { NavLink } from 'react-router-dom';
import RateMovie from '../../RateMovie/RateMovie';

interface IProps {
	movie: TMovie;
}

const MovieCardItem: React.FC<IProps> = ({ movie }) => {
	const {
		id: movieId,
		release_date,
		mainCast,
		video,
		poster_path,
		title,
		runtime,
		genres
	} = movie;

	return (
		<div className="AdviceMeItem">
			<div className="advice-me-header">
				<div className="movie-item-title-rating">
					<NavLink to={`/movies/${movieId}`} className="movie-item-title">
						{title}
						<span className="movie-item-date">
							{release_date ? ' (' + release_date.slice(0, 4) + ')' : null}
						</span>
					</NavLink>
					<div className="movie-item-rating">
						<RateMovie movieId={movieId} />
					</div>
				</div>
				<div className="movie-item-duration-genres">
					{runtime && <span className="duration">{`${runtime} min`}</span>}
					<span className="border-element">{' | '}</span>
					<span className="genres">{genres}</span>
				</div>
			</div>
		</div>
	);
};

export default MovieCardItem;
