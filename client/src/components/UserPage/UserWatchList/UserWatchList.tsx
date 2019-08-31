import React, { useState } from 'react';
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
	fetchWatchList: (userId: string) => object;
	saveWatchItem: (movie: any) => object;
	moveToWatched: (watchId: string) => object;
	deleteWatchItem: (watchId: string) => object;
	selectedUserId: string;
	isOwnData: boolean;
}

export interface IWatchItem {
	id: string;
	created_at: Date;
	movie: TMovie;
	status: string;
}

const UserWatchList: React.FC<IProps> = ({
	watchList,
	fetchWatchList,
	saveWatchItem,
	moveToWatched,
	deleteWatchItem,
	selectedUserId,
	isOwnData
}) => {
	const [select, setSelect] = useState('TO_WATCH');

	if (!watchList) {
		fetchWatchList(selectedUserId);
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

	const onChangeSelectElement = event => {
		setSelect(event.target.value);
	};

	const renderSelectElement = () => (
		<select
			id="watch-list-sort-by-options"
			onChange={onChangeSelectElement}
			value={select}
		>
			<option value="TO_WATCH">Plan to watch movies</option>
			<option value="WATCHED">Watched movies</option>
			<option value="ALL">All movies</option>
		</select>
	);

	return (
		<div className="UserWatchList">
			<div className="user-watch-list-container">
				<div className="watch-list-top-title">
					{isOwnData && (
						<div className="watch-list-left">
							<div className="watch-list-description">
								Find a movie and add to watch list
							</div>
							<div className="watch-search-and-sort">
								<div className="search-input-container">
									<MovieSearch
										onSelectMovie={movie => onSelectMovie(movie)}
										elasticProperties={elasticProperties}
									/>
								</div>
							</div>
						</div>
					)}
					<div className="watch-list-right">
						<div className="sort-element-name">Sort:</div>
						<div className="select-element-container">
							{renderSelectElement()}
						</div>
					</div>
				</div>
				<div className="to-watch-block">
					<div className="watch-block-name"></div>
					<div className="watch-items-container">
						{(select === 'TO_WATCH' || select === 'ALL') &&
							renderWatchList(toWatchList)}
						{(select === 'WATCHED' || select === 'ALL') &&
							renderWatchList(watchedList)}
					</div>
				</div>
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
