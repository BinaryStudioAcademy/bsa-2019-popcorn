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
import { fetchUserRate } from './Movie.redux/actions';

interface IProps {
	movie: TMovie;
	currentUserId: string;
	userRate: number;
	setUserRate: (userId: string, movieId: string) => object;
	fetchUserRate: (userId: string, movieId: string) => object;
}

const MovieSeriesPage: React.SFC<IProps> = ({
	movie,
	currentUserId,
	userRate,
	setUserRate,
	fetchUserRate
}) => {
	const mainPath = '/movie-series';
	console.log(userRate);
	if (!userRate) {
		fetchUserRate('5', '4');
		return <Spinner />;
	}

	return movie ? (
		<div className="movie-series-page">
			<MovieSeriesPageHeader movieSeriesData={movie} />
			<MovieSeriesPageTabs mainPath={mainPath} />
			<MovieSeriesPageTabBody mainPath={mainPath} movie={movie} />
		</div>
	) : (
		<Redirect to={'/movie-list'} />
	);
};

const mapStateToProps = (state, props) => ({
	...props,
	currentUserId: state.profile.profileInfo.id,
	userRate: state.movie.userRate
});

const mapDispatchToProps = dispatch => {
	const actions = { fetchUserRate };
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieSeriesPage);
