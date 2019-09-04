import React from 'react';
import './style.scss';
import { ReactComponent as DurationIcon } from '../../../../assets/icons/general/movie/duration-icon.svg';
import { NavLink } from 'react-router-dom';
import config from '../../../../config';
import Image from '../../../shared/Image/Image';
import TMovie from '../../../MovieSeriesPage/TMovie';
import getFilmDuration from '../../../../helpers/getFilmDuration';

interface IMovieListItemProps {
	movie: TMovie;
	key: string;
	setMovieSeries?: (movie: any) => any;
	saveMovie?: (movie: TMovie) => any;
}

const MovieListItem: React.FC<IMovieListItemProps> = ({
	movie,
	setMovieSeries,
	saveMovie
}) => {
	const duration = getFilmDuration(movie.runtime);

	return (
		<div
			className={'movie-item-preview'}
			onClick={() => {
				if (saveMovie) {
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
			</div>
			<div className="movie-info">
				{!saveMovie && (
					<NavLink
						to={`/movies/${movie.id}`}
						className="movie-link"
						onClick={() => setMovieSeries && setMovieSeries(movie)}
					>
						<div className="movie-title">
							{movie.title}{' '}
							{movie.release_date
								? '(' + movie.release_date.slice(0, 4) + ')'
								: null}
						</div>
					</NavLink>
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
				<div>
					<span className="movie-genre">{movie.genres}</span>
					{duration && (
						<span className="movie-duration">
							<DurationIcon />
							{duration}
						</span>
					)}
				</div>
				<div className="movie-cast">
					<b>Main cast:</b> {movie.mainCast}
				</div>
			</div>
		</div>
	);
};

export default MovieListItem;
