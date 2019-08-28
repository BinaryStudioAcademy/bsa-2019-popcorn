import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	fetchWatchList,
	saveWatchItem,
	moveToWatched,
	deleteWatchItem
} from './actions';
import TMovie from '../../MovieSeriesPage/TMovie';
import Spinner from '../../shared/Spinner';
import './UserWatchList.scss';
import WatchItem from './WatchItem/WatchItem';
import MovieSearch from '../../shared/MovieSearch/MovieSearch';

interface IProps {
	watchList: Array<IWatchItem>;
	fetchWatchList: () => object;
	saveWatchItem: (movie: any) => object;
	moveToWatched: (watchId: string) => object;
	deleteWatchItem: (watchId: string) => object;
}

export interface IWatchItem {
	id: string;
	created_at: Date;
	movie: TMovie;
	status: string;
}

const UserWatchList: React.FC<IProps> = props => {
	const {
		watchList,
		fetchWatchList,
		saveWatchItem,
		moveToWatched,
		deleteWatchItem
	} = props;

	if (!watchList) {
		fetchWatchList();
		return <Spinner />;
	}

	const watchedList: Array<IWatchItem> = [];
	const toWatchList: Array<IWatchItem> = [];

	for (const item of watchList) {
		item.status === 'watched' ? watchedList.push(item) : toWatchList.push(item);
	}

	const renderWatchList = (list: Array<IWatchItem>) =>
		list.map(item => (
			<WatchItem
				deleteWatchItem={deleteWatchItem}
				moveToWatched={moveToWatched}
				watchItem={item}
				key={item.id}
			/>
		));

	const elasticProperties = [
		'id',
		'title',
		'runtime',
		'poster_path',
		'release_date'
	];
	const onSelectMovie = movie => {
		saveWatchItem(movie);
	};

	return (
		<div className="UserWatchList">
			<div className="user-watch-list-container">
				<div className="search-input-container">
					<MovieSearch
						onSelectMovie={movie => onSelectMovie(movie)}
						elasticProperties={elasticProperties}
					/>
				</div>
				{toWatchList.length !== 0 && (
					<div className="to-watch-block">
						<div className="watch-block-name">To watch</div>
						<div className="watch-items-container">
							{renderWatchList(toWatchList)}
						</div>
					</div>
				)}
				{watchedList.length !== 0 && (
					<div className="watched-block">
						<div className="watch-block-name">Watched</div>
						<div className="watch-items-container">
							{renderWatchList(watchedList)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	...props,
	watchList: state.watchList.watchList
});

const mapDispatchToProps = dispatch => {
	const actions = {
		fetchWatchList,
		saveWatchItem,
		moveToWatched,
		deleteWatchItem
	};

	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserWatchList);
