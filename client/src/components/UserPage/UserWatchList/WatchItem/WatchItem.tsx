import React from 'react';
import { IWatchItem } from '../UserWatchList';
import './WatchItem.scss';

interface IProps {
	watchItem: IWatchItem;
}

const WatchItem: React.FC<IProps> = props => {
	const { status, movie } = props.watchItem;

	return (
		<div className="WatchItem">
			<div className="watch-item-container">
				movie: {movie.title} {'  '}
				status: {status}
			</div>
		</div>
	);
};

export default WatchItem;
