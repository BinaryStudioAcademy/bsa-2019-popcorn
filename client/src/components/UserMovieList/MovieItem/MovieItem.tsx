import React from 'react';
import { IMovie, IWatchListId } from '../UserMovieList';
import './MovieItem.scss';
import Image from '../../shared/Image/Image';
import config from '../../../config';
import { NavLink } from 'react-router-dom';

interface IProps {
	movie: IMovie;
	addMovieToWatchList: (watchId: string) => object;
	deleteMovieFromWatchList: (watchId: string, movieId: string) => object;
	watchListLoading?: boolean;
	loadingOnMovie?: string;
}

const MovieItem: React.FC<IProps> = ({
	movie,
	addMovieToWatchList,
	deleteMovieFromWatchList,
	watchListLoading,
	loadingOnMovie
}) => {
	const {
		id,
		title,
		poster_path,
		release_date,
		runtime,
		overview,
		genres,
		watchInfo
	} = movie;

	const renderWatchItemElement = () => {
		if (watchListLoading && String(loadingOnMovie) === String(id)) {
			return (
				<div
					className={`watch-list-icon loading-now`}
					onClick={ev => ev.preventDefault()}
				>
					<div className="loading-now-spinner"></div>
				</div>
			);
		}
		if (!watchInfo) {
			return (
				<div
					className={`watch-list-icon add-to-watch-list`}
					onClick={ev => {
						ev.preventDefault();
						addMovieToWatchList(id);
					}}
					title="add to watch list"
				/>
			);
		}
		const { status, id: watchId } = watchInfo!;

		if (status === 'to_watch') {
			return (
				<div
					className={`watch-list-icon to-watch`}
					onClick={ev => {
						ev.preventDefault();
						deleteMovieFromWatchList(watchId, id);
					}}
					title="Click to remove from watch list"
				/>
			);
		}
		if (status === 'watched') {
			return (
				<div
					className={`watch-list-icon watched`}
					onClick={ev => {
						ev.preventDefault();
					}}
					title="You have already watched this movie"
				/>
			);
		}
	};

	return (
		<div className="MovieItem">
			<NavLink to={`/movies/${id}`} className="movie-item-image-container">
				<Image
					src={`${config.POSTER_PATH}/${poster_path}`}
					defaultSrc={config.DEFAULT_MOVIE_IMAGE}
					alt="movie-poster"
				/>
				{renderWatchItemElement()}
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
