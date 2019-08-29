import React from 'react';
import MovieSeriesPageHeader from './MovieSeriesPageHeader';
import MovieSeriesPageTabs from './MovieSeriesPageTabs';
import MovieSeriesPageTabBody from './MovieSeriesPageTabBody';
import './MovieSeriesPage.scss';
import { connect } from 'react-redux';
import Spinner from '../shared/Spinner';
import { bindActionCreators } from 'redux';
import {
	fetchUserRate,
	fetchMovie,
	setUserRate,
	fetchReviewByMovieUserId as fetchReview,
	setReview,
	removeReviewSet
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
		removeReviewSet
	} = props;
	const mainPath = `/movies/${props.match.params.id}`;

	if (!fetchedMovie || fetchedMovie.id != props.match.params.id) {
		fetchMovie(props.match.params.id);
		return <Spinner />;
	}
	if (!userRate || userRate.movieId != props.match.params.id) {
		fetchUserRate(userId, props.match.params.id);
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
			/>
			<MovieSeriesPageTabs mainPath={mainPath} />
			<MovieSeriesPageTabBody
				mainPath={mainPath}
				movie={movie}
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
	ownReview: rootState.movie.ownReview
});

const mapDispatchToProps = dispatch => {
	const actions = {
		fetchUserRate,
		fetchMovie,
		setUserRate,
		fetchReview,
		setReview,
		removeReviewSet
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieSeriesPage);
