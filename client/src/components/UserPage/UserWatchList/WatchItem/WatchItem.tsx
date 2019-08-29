import React, { useState } from 'react';
import { IWatchItem } from '../UserWatchList';
import './WatchItem.scss';
import Image from '../../../shared/Image/Image';
import config from '../../../../config';
import { NavLink } from 'react-router-dom';
import { ReactComponent as DurationIcon } from '../../../../assets/icons/general/movie/duration-icon.svg';
import getFilmDuration from '../../../../helpers/getFilmDuration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStar } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/general/closeIcon.svg';

interface IProps {
	watchItem: IWatchItem;
	moveToWatched: (watchId: string) => object;
	deleteWatchItem: (watchId: string) => object;
}

const WatchItem: React.FC<IProps> = props => {
	const { status, id } = props.watchItem;
	const {
		poster_path,
		title,
		id: movieId,
		release_date,
		runtime,
		genres
	} = props.watchItem.movie;
	const { moveToWatched, deleteWatchItem } = props;
	const duration = getFilmDuration(runtime);
	const [hover, setHover] = useState(false);

	const hoverImage = () => {
		setHover(!hover);
	};

	const vote_average = 3;

	return (
		<div className="WatchItem">
			<div className="watch-item-container">
				<div
					className="watch-image-wrapper"
					onMouseEnter={hoverImage}
					onMouseLeave={hoverImage}
				>
					<NavLink to={'/movies/' + movieId}>
						<Image
							src={poster_path}
							defaultSrc={config.DEFAULT_MOVIE_IMAGE}
							alt="poster"
						/>
					</NavLink>
					{hover && <div className="absolute-data-in-image"></div>}
				</div>
				<div className="watch-main">
					<div className="watch-main-bottom">
						<div className="watch-movie-title">{title}</div>
						<div className="watch-secondary">
							{duration && (
								<div className="movie-duration">
									<DurationIcon />
									{duration}
								</div>
							)}
							<div className="totaly-movie-rating">
								<FontAwesomeIcon className="icon-star" icon={faStar} />
								{Number(vote_average) || 0}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WatchItem;
