import React from 'react';
import { connect } from 'react-redux';
import {
	fetchWatchListIds,
	addMovieToWatchList,
	deleteMovieFromWatchList
} from '../../UserPage/UserWatchList/actions';
import { bindActionCreators } from 'redux';
import './WatchListIcon.scss';

interface IProps {
	movieId: string;
	addMovieToWatchList: (watchId: string) => object;
	deleteMovieFromWatchList: (watchId: string, movieId: string) => object;
	watchListLoading?: boolean;
	loadingOnMovie?: string;
	fetchWatchListIds: () => object;
	watchListIds: any[];
	firstWatchListLoading?: boolean;
}

const WatchListIcon: React.FC<IProps> = ({
	movieId,
	addMovieToWatchList,
	deleteMovieFromWatchList,
	watchListLoading,
	loadingOnMovie,
	watchListIds,
	fetchWatchListIds,
	firstWatchListLoading
}) => {
	if (!watchListIds && !firstWatchListLoading) {
		fetchWatchListIds();
	}

	if (!watchListIds) {
		return null;
	}

	const watchInfo = watchListIds.find(
		watch => String(watch.movieId) === String(movieId)
	);
	const renderWatchItemElement = () => {
		if (watchListLoading && String(loadingOnMovie) === String(movieId)) {
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
						addMovieToWatchList(movieId);
					}}
					title="Click to add movie to watch list"
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
						deleteMovieFromWatchList(watchId, movieId);
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

	return <div className="WatchListIcon">{renderWatchItemElement()}</div>;
};

const mapStateToProps = (rootState, props) => ({
	...props,
	watchListIds: rootState.watchList.watchListIds,
	watchListLoading: rootState.watchList.isLoading,
	loadingOnMovie: rootState.watchList.loadingOnMovie,
	firstWatchListLoading: rootState.watchList.firstLoading
});

const mapDispatchToProps = dispatch => {
	const actions = {
		fetchWatchListIds,
		addMovieToWatchList,
		deleteMovieFromWatchList
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WatchListIcon);
