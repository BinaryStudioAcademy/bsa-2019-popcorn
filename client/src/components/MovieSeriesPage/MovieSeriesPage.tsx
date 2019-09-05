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
	fetchAwards,
	fetchStatistics,
	deleteUserRate,
	fetchPostsByFilm
} from './Movie.redux/actions';

interface IProps {
	fetchedMovie: any;
	userRate: IUserRate;
	setUserRate: (userRate: any) => object;
	deleteUserRate: (userRate: any) => object;
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
	fetchWatchListStatus: (movieId: string) => object;
	watchListStatus?: any;
	addMovieToWatchList: (movieId: string) => object;
	deleteMovieFromWatchList: (watchId: string, movieId: string) => object;
	watchListLoading?: boolean;
	fetchAwards: (id: any) => any;
	awards: any;
	fetchStatistics: (movieId: string) => void;
	statistics: any;
	fetchPostsByFilm: (movieId: string) => void;
	posts?: Array<any>;
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
		deleteUserRate,
		fetchMovie,
		avatar,
		userId,
		username,
		fetchReview,
		ownReview,
		setReview,
		removeReviewSet,
		fetchWatchListStatus,
		watchListStatus,
		addMovieToWatchList,
		deleteMovieFromWatchList,
		watchListLoading,
		fetchAwards,
		awards,
		statistics,
		fetchStatistics,
		fetchPostsByFilm,
		posts
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
				movie={movie}
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
				deleteUserRate={deleteUserRate}
			/>
			<MovieSeriesPageTabs mainPath={mainPath} />
			<MovieSeriesPageTabBody
				mainPath={mainPath}
				movie={movie}
				currentUser={{ avatar, id: userId, name: username }}
				fetchAwards={fetchAwards}
				awards={awards}
				statistics={statistics}
				fetchStatistics={fetchStatistics}
				fetchPostsByFilm={fetchPostsByFilm}
				posts={posts}
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
	watchListStatus: rootState.watchList.watchListStatus,
	watchListLoading: rootState.watchList.isLoading,
	awards: rootState.movie.awards,
	statistics: rootState.movie.statistics,
	posts: rootState.movie.posts
});

const mapDispatchToProps = dispatch => {
	const actions = {
		fetchUserRate,
		fetchMovie,
		setUserRate,
		fetchReview,
		setReview,
		removeReviewSet,
		fetchWatchListStatus,
		addMovieToWatchList,
		deleteMovieFromWatchList,
		fetchAwards,
		fetchStatistics,
		deleteUserRate,
		fetchPostsByFilm
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieSeriesPage);
