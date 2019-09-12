import React, { useState, ObjectHTMLAttributes } from 'react';
import './AdviceMeItem.scss';
import config from '../../../../config';
import Image from '../../Image/Image';
import TMovie from '../../../MovieSeriesPage/TMovie';
import WatchListIcon from '../../WatchListIcon/WatchListIcon';
import { NavLink } from 'react-router-dom';
import RateMovie from '../../RateMovie/RateMovie';
import VideoPlayer from '../../VideoPlayer/VideoPlayer';
import getTotalMovieRate from '../../../../helpers/getTotalMovieRate';

interface IProps {
	movie: TMovie;
	setNewRateInfo: (rateInfo: any) => object;
}

const MovieCardItem: React.FC<IProps> = ({ movie, setNewRateInfo }) => {
	const {
		id: movieId,
		release_date,
		mainCast,
		video,
		poster_path,
		title,
		runtime,
		genres,
		overview,
		rateInfo
	} = movie;

	const updateTotalRate = (prevUserRate, userRate) => {
		const newRateInfo = getTotalMovieRate(rateInfo, prevUserRate, userRate);
		setNewRateInfo(newRateInfo);
	};

	return (
		<div className="AdviceMeItem">
			<div className="top-fixed-wrapper">
				<div className="advice-me-header">
					<div className="movie-item-title-rating">
						<NavLink to={`/movies/${movieId}`} className="movie-item-title">
							{title}
							<span className="movie-item-date">
								{release_date ? ' (' + release_date.slice(0, 4) + ')' : null}
							</span>
						</NavLink>
						<div className="movie-item-rating">
							<RateMovie updateTotalRate={updateTotalRate} movieId={movieId} />
							<span className="movie-total-rating">
								{rateInfo.average}
								<span className="max-rating">/10</span>
							</span>
						</div>
					</div>
					<div className="movie-item-duration-genres">
						{runtime && <span className="duration">{`${runtime} min`}</span>}
						<span className="border-element">{' | '}</span>
						<span className="genres">{genres}</span>
					</div>
				</div>
				<div className="movie-item-poster">
					<NavLink
						to={`/movies/${movieId}`}
						className="movie-item-image-container"
					>
						<Image
							src={poster_path}
							defaultSrc={config.DEFAULT_MOVIE_IMAGE}
							alt="movie-poster"
						/>
						<WatchListIcon movieId={movie.id} />
					</NavLink>
				</div>
				<div className="movie-item-overview">{overview}</div>
			</div>
			<div className="bottom-fixed-wrapper">
				<div className="movie-item-main-cast">
					<span className="main-cast-label">Main Cast: &nbsp;</span>
					<span className="main-cast-list">{mainCast}</span>
				</div>
				<VideoPlayer videoPath={video} />
			</div>
		</div>
	);
};

export default MovieCardItem;
