import React from 'react';
import './MovieListItem.scss';
import { ReactComponent as GenreIcon } from '../../../assets/icons/general/movie/genre-icon.svg';
import { ReactComponent as DurationIcon } from '../../../assets/icons/general/movie/duration-icon.svg';
import { NavLink } from 'react-router-dom';

interface IMovieListItemProps {
	movie: {
		id: string;
		title: string;
		year?: number;
		image: string;
		runtime: number;
		genres: Array<string>;
		cast: Array<string>;
	};
	key: string;
	setMovieSeries: (movie: any) => any;
}

const getFilmDuration = (runtime: number) => {
	if (!runtime || runtime <= 0) {
		return null;
	}
	const minutes = runtime % 60;
	const hours = Math.floor(runtime / 60);
	const mm = minutes < 10 ? `0${minutes}` : minutes;
	const hh = hours < 10 ? `0${hours}` : hours;
	return `${hh}:${mm}`;
};

const MovieListItem: React.FC<IMovieListItemProps> = ({
	movie,
	setMovieSeries
}) => {
	const duration = getFilmDuration(movie.runtime);
	return (
		<div className="movie-item">
			<div className="movie-poster-wrp">
				<img className="movie-poster" alt="movie-poster" src={movie.image} />
			</div>
			<div className="movie-info">
				<NavLink
					to={'/movie-series'}
					className="movie-link"
					onClick={() => setMovieSeries(movie)}
				>
					<div className="movie-title">
						{movie.title} {movie.year}
					</div>
				</NavLink>
				<div>
					{/*movie.genres.slice(0,3).join(', ')*/}
					<span className="movie-genre">
						<GenreIcon />
						{'Action, Drama, Horror'}
					</span>
					{duration && (
						<span className="movie-duration">
							<DurationIcon />
							{duration}
						</span>
					)}
				</div>
				{/*movie.cast.join(', ')*/}
				<div className="movie-cast">
					<b>Main cast:</b> {'Matt Damon, Jessica Chastain, Kristen Wiig'}
				</div>
			</div>
		</div>
	);
};

export default MovieListItem;
