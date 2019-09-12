import React from 'react';
import './MovieListItem.scss';
import { NavLink } from 'react-router-dom';
import config from '../../../config';
import Image from '../../shared/Image/Image';
import TMovie from '../../MovieSeriesPage/TMovie';
import getFilmDuration from '../../../helpers/getFilmDuration';
import WatchListIcon from '../../shared/WatchListIcon/WatchListIcon';
import RateMovie from '../../shared/RateMovie/RateMovie';
import getTotalMovieRate from '../../../helpers/getTotalMovieRate';

interface IMovieListItemProps {
	movie: TMovie;
	key: string;
	setMovieSeries?: (movie: any) => any;
	saveMovie?: (movie: TMovie) => any;
	setNewRateInfo?: any;
}

const MovieListItem: React.FC<IMovieListItemProps> = ({
	movie,
	setMovieSeries,
	saveMovie,
	setNewRateInfo
}) => {
	const duration = getFilmDuration(movie.runtime);
	const updateTotalRate = (prevUserRate, userRate) => {
		const newRateInfo = getTotalMovieRate(
			movie.rateInfo,
			prevUserRate,
			userRate
		);
		setNewRateInfo(newRateInfo);
	};
	return (
		<NavLink
			to={`/movies/${movie.id}`}
			className="movie-link"
			onClick={() => setMovieSeries && setMovieSeries(movie)}
		>
			<div
				className="movie-item"
				onClick={e => {
					if (saveMovie) {
						e.preventDefault();
						saveMovie(movie);
					}
				}}
			>
				<div className="movie-poster-wrp">
					<Image
						src={movie.poster_path}
						defaultSrc={config.DEFAULT_MOVIE_IMAGE}
						alt="movie-poster"
						className="movie-poster"
					/>
					<WatchListIcon movieId={movie.id} />
				</div>
				<div className="movie-info">
					{!saveMovie && (
						<div className="movie-header">
							<span className="movie-title">{movie.title} </span>
							<span className="movie-year">
								{movie.release_date
									? '(' + movie.release_date.slice(0, 4) + ')'
									: null}
							</span>
						</div>
					)}
					{saveMovie && (
						<div className={'movie-link'}>
							<div className="movie-title">
								{movie.title}{' '}
								{movie.release_date
									? '(' + movie.release_date.slice(0, 4) + ')'
									: null}
							</div>
						</div>
					)}
					<div className="movie-genre">{movie.genres}</div>
					<div className="movie-footer">
						{duration && <div className="movie-duration">{duration}</div>}
						{setNewRateInfo && (
							<div className="movie-item-rating">
								<RateMovie
									updateTotalRate={updateTotalRate}
									movieId={movie.id}
								/>
								<span className="movie-total-rating">
									{+movie.rateInfo.average.toString()}
									<span className="max-rating">/10</span>
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</NavLink>
	);
};

export default MovieListItem;
