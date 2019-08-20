import React from 'react';
import MovieSeriesPageHeader from './MovieSeriesPageHeader';
import MovieSeriesPageTabs from './MovieSeriesPageTabs';
import MovieSeriesPageTabBody from './MovieSeriesPageTabBody';
import './MovieSeriesPage.scss';
import { connect } from 'react-redux';
import Spinner from '../shared/Spinner';
import { bindActionCreators } from 'redux';
import { fetchUserRate, fetchMovie, setUserRate } from './Movie.redux/actions';

interface IProps {
	fetchedMovie: any;
	currentUserId: string;
	userRate: IUserRate;
	setUserRate: (userRate: any) => object;
	fetchUserRate: (userId: string, movieId: string) => object;
	fetchMovie: (movieId: string) => object;
	match: any;
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
		currentUserId,
		userRate,
		setUserRate,
		fetchUserRate,
		fetchMovie
	} = props;
	const mainPath = `/movie-series/${props.match.params.id}`;

	if (!fetchedMovie || fetchedMovie.id != props.match.params.id) {
		fetchMovie(props.match.params.id);
		return <Spinner />;
	}
	if (!userRate || userRate.movieId != props.match.params.id) {
		fetchUserRate(currentUserId, props.match.params.id);
		return <Spinner />;
	}
	const movie = fetchedMovie;

	return (
		<div className="movie-series-page">
			<MovieSeriesPageHeader
				movieSeriesData={movie}
				userRate={userRate}
				setUserRate={rateObj => setUserRate(rateObj)}
			/>
			<MovieSeriesPageTabs mainPath={mainPath} />
			<MovieSeriesPageTabBody mainPath={mainPath} movie={movie} />
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	...props,
	currentUserId: state.profile.profileInfo.id,
	userRate: state.movie.userRate,
	fetchedMovie: state.movie.fetchedMovie
});

const mapDispatchToProps = dispatch => {
	const actions = {
		fetchUserRate,
		fetchMovie,
		setUserRate
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieSeriesPage);
