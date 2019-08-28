import React from 'react';
import MovieSeriesPageHeader from './MovieSeriesPageHeader';
import MovieSeriesPageTabs from './MovieSeriesPageTabs';
import MovieSeriesPageTabBody from './MovieSeriesPageTabBody';
import './MovieSeriesPage.scss';
import { connect } from 'react-redux';
import Spinner from '../shared/Spinner';
import { bindActionCreators } from 'redux';
import {
	fetchWatchListStatus,
	addMovieToWatchList,
	deleteMovieFromWatchList
} from '../UserPage/UserWatchList/actions';
import {
	fetchUserRate,
	fetchMovie,
	setUserRate,
	fetchReviewByMovieUserId as fetchReview,
	setReview,
	removeReviewSet,
	fetchCastCrew
} from './Movie.redux/actions';

interface IProps {
	fetchedMovie: any;
	userRate: IUserRate;
	setUserRate: (userRate: any) => object;
	fetchUserRate: (userId: string, movieId: string) => object;
	fetchMovie: (movieId: string) => object;
	fetchReview: (userId: string, movieId: string) => object;
	setReview: (
		userId: string,
		movieId: string,
		text: string,
		prevId?: string
	) => object;
	removeReviewSet: () => object;
	ownReview: any;
	match: any;
	avatar?: string;
	userId: string;
	username: string;
	fetchCastCrew: (id: any) => any;
	crewCast: any;
	fetchWatchListStatus: (movieId: string) => object;
	watchListStatus?: any;
	addMovieToWatchList: (movieId: string) => object;
	deleteMovieFromWatchList: (watchId: string, movieId: string) => object;
	watchListLoading?: boolean;
}

export interface IUserRate {
	id?: string;
	movieId: string;
	userId: string;
	rate: string;
}

const MovieSeriesPage: React.SFC<IProps> = props => {
	const {
		fetchedMovie,
		userRate,
		setUserRate,
		fetchUserRate,
		fetchMovie,
		avatar,
		userId,
		username,
		fetchReview,
		ownReview,
		setReview,
		removeReviewSet,
		fetchCastCrew,
		crewCast,
		fetchWatchListStatus,
		watchListStatus,
		addMovieToWatchList,
		deleteMovieFromWatchList,
		watchListLoading
	} = props;
	const currentMovieId = props.match.params.id;
	const mainPath = `/movies/${currentMovieId}`;

	if (!fetchedMovie || fetchedMovie.id != currentMovieId) {
		fetchMovie(currentMovieId);
		return <Spinner />;
	}
	if (!userRate || userRate.movieId != currentMovieId) {
		fetchUserRate(userId, currentMovieId);
		return <Spinner />;
	}

	if (!watchListStatus || watchListStatus.movieId != currentMovieId) {
		fetchWatchListStatus(currentMovieId);
		return <Spinner />;
	}

	const movie = fetchedMovie;

	return (
		<div className="movie-series-page">
			<MovieSeriesPageHeader
				movieSeriesData={movie}
				userRate={userRate}
				setUserRate={rateObj => setUserRate(rateObj)}
				ownReview={ownReview}
				fetchReview={fetchReview}
				userId={userId}
				movieId={movie.id}
				setReview={setReview}
				removeReviewSet={removeReviewSet}
				watchListStatus={watchListStatus}
				addMovieToWatchList={addMovieToWatchList}
				deleteMovieFromWatchList={deleteMovieFromWatchList}
				watchListLoading={watchListLoading}
			/>
			<MovieSeriesPageTabs mainPath={mainPath} />
			<MovieSeriesPageTabBody
				mainPath={mainPath}
				movie={movie}
				fetchCastCrew={fetchCastCrew}
				crewCast={crewCast}
				currentUser={{ avatar, id: userId, name: username }}
			/>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	userRate: rootState.movie.userRate,
	fetchedMovie: rootState.movie.fetchedMovie,
	avatar: rootState.profile.profileInfo && rootState.profile.profileInfo.avatar,
	userId: rootState.profile.profileInfo && rootState.profile.profileInfo.id,
	username: rootState.profile.profileInfo && rootState.profile.profileInfo.name,
	ownReview: rootState.movie.ownReview,
	crewCast: rootState.movie.crewCast,
	watchListStatus: rootState.watchList.watchListStatus,
	watchListLoading: rootState.watchList.isLoading
});

const mapDispatchToProps = dispatch => {
	const actions = {
		fetchUserRate,
		fetchMovie,
		setUserRate,
		fetchReview,
		setReview,
		removeReviewSet,
		fetchCastCrew,
		fetchWatchListStatus,
		addMovieToWatchList,
		deleteMovieFromWatchList
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieSeriesPage);
