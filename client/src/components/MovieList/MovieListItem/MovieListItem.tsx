import React from 'react';
import './MovieListItem.scss';
import { ReactComponent as DurationIcon } from '../../../assets/icons/general/movie/duration-icon.svg';
import { NavLink } from 'react-router-dom';
import config from '../../../config';
import Image from '../../shared/Image/Image';
import TMovie from '../../MovieSeriesPage/TMovie';
import getFilmDuration from '../../../helpers/getFilmDuration';

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
		<NavLink
			to={`/movies/${movie.id}`}
			className="movie-link"
			onClick={() => setMovieSeries && setMovieSeries(movie)} 
		>
			<div
				className="movie-item"
				onClick={e => {
					e.preventDefault();
					if (saveMovie) saveMovie(movie);
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
							<div className='movie-header'>
								<span className="movie-title">
									{movie.title}{' '}
								</span>
								<span className="movie-year">
									{movie.release_date
										? '' + movie.release_date.slice(0, 4) + ''
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
					{duration && (
						<div className="movie-duration">
							{duration}
						</div>
					)}
				</div>
			</div>
		</NavLink>
	);
};

export default MovieListItem;
