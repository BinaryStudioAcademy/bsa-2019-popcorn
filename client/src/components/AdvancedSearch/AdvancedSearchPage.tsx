import React from 'react';
import AdvancedMovieSearch from './AdvancedMovieSearch/AdvancedMovieSearch';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	fetchFiltredMovies,
	setMovieSeries
} from '../MovieSeriesPage/Movie.redux/actions';
import TMovie from '../MovieSeriesPage/TMovie';
import MovieList from '../MovieList/MovieList';
import Spinner from '../shared/Spinner';
import './AdvancedSearchPage.scss';

type userInfo = {
	id: string;
	name: string;
	image: string;
	any;
};

interface IAdvancedSearchPage {
	userInfo: userInfo;
	movieList: null | Array<TMovie>;
	fetchFiltredMovies: (filters: any) => any;
	setMovieSeries: (movie: any) => any;
}

const MovieListRender = (movieList, fetchFiltredMovies, setMovieSeries) => {
	if (!movieList) {
		fetchFiltredMovies({
			nameValue: '',
			genresValues: [],
			ratingValues: [],
			yearValues: [],
			descriptionValue: '',
			castValues: [],
			crewValues: [],
			durationValues: []
		});
		return <Spinner />;
	}
	return (
		<MovieList
			movies={movieList}
			setMovieSeries={setMovieSeries}
			twoColumns={true}
		/>
	);
};

const AdvancedSearchPage = ({
	movieList,
	fetchFiltredMovies,
	setMovieSeries
}: IAdvancedSearchPage) => {
	return (
		<div className="advanced-search-page">
			<AdvancedMovieSearch fetchFiltredMovies={fetchFiltredMovies} />
			<div className="movie-list-wrp">
				{MovieListRender(movieList, fetchFiltredMovies, setMovieSeries)}
			</div>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	isAuthorized: !!rootState.profile.profileInfo,
	userInfo: rootState.profile.profileInfo,
	movieList: rootState.movie.movieSearchInAdvancedSearch,
	filters: rootState.movie.filters
});
const actions = {
	fetchFiltredMovies,
	setMovieSeries
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdvancedSearchPage);
