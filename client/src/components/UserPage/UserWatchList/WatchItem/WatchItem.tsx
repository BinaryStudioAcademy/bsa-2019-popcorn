import React from 'react';
import { IWatchItem } from '../UserWatchList';
import './WatchItem.scss';
import Image from '../../../shared/Image/Image';
import config from '../../../../config';
import { NavLink } from 'react-router-dom';
import { ReactComponent as DurationIcon } from '../../../../assets/icons/general/movie/duration-icon.svg';
import getFilmDuration from '../../../../helpers/getFilmDuration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/general/closeIcon.svg';

interface IProps {
	watchItem: IWatchItem;
}

const WatchItem: React.FC<IProps> = props => {
	const { status } = props.watchItem;
	const {
		poster_path,
		title,
		id: movieId,
		release_date,
		runtime,
		genres
	} = props.watchItem.movie;

	const duration = getFilmDuration(runtime);

	return (
		<div className="WatchItem">
			<div className="watch-item-container">
				<div className="watch-image-wrapper">
					<NavLink to={'/movies/' + movieId}>
						<Image
							src={poster_path}
							defaultSrc={config.DEFAULT_MOVIE_IMAGE}
							alt="poster"
						/>
					</NavLink>
				</div>
				<div className="watch-main">
					<div className="watch-main-top">
						<div className="watch-movie-title">
							<NavLink
								className="watch-movie-title-nav-link"
								to={'/movies/' + movieId}
							>
								<div className="movie-title-name">
									{title}
									<span className="movie-title-date">
										{release_date
											? ' (' + release_date.slice(0, 4) + ')'
											: null}
									</span>
								</div>
							</NavLink>
						</div>
						<div className="movie-genre">{genres}</div>
						{duration && (
							<div className="movie-duration">
								<DurationIcon />
								{duration}
							</div>
						)}
					</div>
					<div className="watch-buttons">
						{status === 'to_watch' && (
							<button
								className="move-button"
								onClick={e => {
									e.preventDefault();
								}}
							>
								Move to Watched
							</button>
						)}
						<button
							className="delete-button"
							onClick={e => {
								e.preventDefault();
							}}
						>
							<CloseIcon className="delete-button-svg" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WatchItem;
