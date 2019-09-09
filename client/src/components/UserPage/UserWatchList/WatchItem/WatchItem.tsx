import React, { useState } from 'react';
import { IWatchItem } from '../UserWatchList';
import './WatchItem.scss';
import Image from '../../../shared/Image/Image';
import config from '../../../../config';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
		release_date
	} = props.watchItem.movie;
	const { moveToWatched, deleteWatchItem } = props;
	const [hover, setHover] = useState(false);

	return (
		<div className="WatchItem">
			<div className="watch-item-container">
				<div
					className="watch-image-wrapper"
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					<NavLink to={'/movies/' + movieId}>
						<Image
							src={poster_path}
							defaultSrc={config.DEFAULT_MOVIE_IMAGE}
							alt="poster"
						/>
					</NavLink>
					{status === 'watched' ? (
						<div
							className={`absolute watch-status watched`}
							title="You have already watched this movie"
						></div>
					) : (
						<div
							className={`absolute watch-status to-watch`}
							title='Click to mark as "watched"'
							onClick={() => {
								moveToWatched(id);
							}}
						></div>
					)}
					{hover && (
						<div onClick={() => deleteWatchItem(id)}>
							<FontAwesomeIcon
								className="watch-delete-button absolute"
								icon={faTimes}
								title="Click to delete from watch list"
							/>
						</div>
					)}
				</div>
				<div className="watch-main">
					<div className="watch-main-bottom">
						<div className="watch-movie-title">
							{title}
							<span className="watch-movie-date">
								{release_date ? ' (' + release_date.slice(0, 4) + ')' : null}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WatchItem;
