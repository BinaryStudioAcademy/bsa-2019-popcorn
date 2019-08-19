import React from 'react';
import MovieSeriesPageHeader from './MovieSeriesPageHeader';
import MovieSeriesPageTabs from './MovieSeriesPageTabs';
import MovieSeriesPageTabBody from './MovieSeriesPageTabBody';
import './MovieSeriesPage.scss';
import { Redirect } from 'react-router';
import TMovie from './TMovie';
import { connect } from 'react-redux';
import { StringifyOptions } from 'querystring';
import Spinner from '../shared/Spinner';
import { bindActionCreators } from 'redux';
import { fetchUserRate, fetchMovie } from './Movie.redux/actions';
import movieAdapter from './movieAdapter';

interface IProps {
	movieSeries: TMovie;
	fetchedMovie: any;
	currentUserId: string;
	userRate: number;
	setUserRate: (userId: string, movieId: string) => object;
	fetchUserRate: (userId: string, movieId: string) => object;
	fetchMovie: (movieId: string) => object;
	match: any;
}

const MovieSeriesPage: React.SFC<IProps> = props => {
	const {
		fetchedMovie,
		movieSeries,
		currentUserId,
		userRate,
		setUserRate,
		fetchUserRate,
		fetchMovie
	} = props;
	const mainPath = `/movie-series/${props.match.params.id}`;

	if (!movieSeries && !fetchedMovie) {
		fetchMovie(props.match.params.id);
		return <Spinner />;
	}
	if (!userRate) {
		fetchUserRate('5', '4');
		return <Spinner />;
	}

	const movie = movieSeries || fetchedMovie;
	console.log(movie);
	return (
		<div className="movie-series-page">
			<MovieSeriesPageHeader movieSeriesData={movie} />
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
	const actions = { fetchUserRate, fetchMovie };
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieSeriesPage);
