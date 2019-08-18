import React from 'react';
import MovieSeriesPageHeader from './MovieSeriesPageHeader';
import MovieSeriesPageTabs from './MovieSeriesPageTabs';
import MovieSeriesPageTabBody from './MovieSeriesPageTabBody';
import './MovieSeriesPage.scss';
import { Redirect } from 'react-router';

interface IProps {
	movie: null | Movie;
}
type Movie = {
	id: string;
	poster_path: string;
	runtime: number;
	title: string;
	release_date?: string;
	genres: Array<string>;
	cast: Array<string>;
	overview: string;
	vote_average: number;
	budget: number;
	any?;
};

const MovieSeriesPage: React.SFC<IProps> = ({ movie }) => {
	const mainPath = '/movie-series';

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

export default MovieSeriesPage;
