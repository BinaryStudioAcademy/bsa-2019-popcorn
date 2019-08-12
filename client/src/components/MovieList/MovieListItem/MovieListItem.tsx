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
		duration: string;
		genres: Array<string>;
		cast: Array<string>;
	};
	key: string;
	setMovieSeries: (movie: any) => any;
}

const MovieListItem: React.FC<IMovieListItemProps> = ({
	movie,
	setMovieSeries
}) => {
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
					<span className="movie-duration">
						<DurationIcon />
						{movie.duration}
					</span>
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
