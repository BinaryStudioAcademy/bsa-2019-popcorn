import React from 'react';
import MovieSeriesPageHeader from './MovieSeriesPageHeader';
import MovieSeriesPageTabs from './MovieSeriesPageTabs';
import MovieSeriesPageTabBody from './MovieSeriesPageTabBody';
import './MovieSeriesPage.scss';
import { Redirect } from 'react-router';
import TMovie from './TMovie';
import movieAdapter from './movieAdapter';

interface IProps {
	movie: null | TMovie;
}

const MovieSeriesPage: React.SFC<IProps> = ({ movie }) => {
	const mainPath = '/movie-series';

	return movie ? (
		<div className="movie-series-page">
			<MovieSeriesPageHeader movieSeriesData={movie} />
			<MovieSeriesPageTabs mainPath={mainPath} />
			<MovieSeriesPageTabBody mainPath={mainPath} movie={movieAdapter(movie)} />
		</div>
	) : (
		<Redirect to={'/movie-list'} />
	);
};

export default MovieSeriesPage;
