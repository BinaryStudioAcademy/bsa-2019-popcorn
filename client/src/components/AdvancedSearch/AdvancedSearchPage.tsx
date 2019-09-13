import React from 'react';
import AdvancedMovieSearch from './AdvancedMovieSearch/AdvancedMovieSearch';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	fetchFiltredMovies,
	setMovieSeries,
	loadMoreFiltredMovie,
	setFilters,
	getGenres,
	setNewRateInfo
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
	movieList: null | TMovie[];
	fetchFiltredMovies: (filters: any) => any;
	setMovieSeries: (movie: any) => any;
	loadMoreFiltredMovie: (size: number, from: number, filters: any) => any;
	setFilters: (filters: any) => any;
	filters: any;
	showSpinner: boolean;
	genres: any;
	getGenres: () => any;
	setNewRateInfo: any;
}

const MovieListRender = (
	movieList,
	fetchFiltredMovies,
	setMovieSeries,
	loadMoreFiltredMovie,
	filters,
	setNewRateInfo
) => {
	if (!movieList) {
		fetchFiltredMovies({
			nameValue: '',
			genresValues: [],
			ratingValues: [],
			yearValues: [],
			descriptionValue: '',
			castValues: '',
			crewValues: [],
			durationValues: []
		});
		return <Spinner />;
	}

	return (
		<MovieList
			movies={movieList}
			setMovieSeries={setMovieSeries}
			loadMoreMovie={loadMoreFiltredMovie}
			filters={filters}
			setNewRateInfo={setNewRateInfo}
		/>
	);
};

const AdvancedSearchPage = ({
	movieList,
	fetchFiltredMovies,
	setMovieSeries,
	loadMoreFiltredMovie,
	setFilters,
	filters,
	showSpinner,
	genres,
	getGenres,
	setNewRateInfo
}: IAdvancedSearchPage) => {
	let convertGenres = null;
	if (!genres) {
		getGenres();
	}
	if (genres) {
		convertGenres = genres.map(el => el.name);
	}
	return genres ? (
		<div className="advanced-search-page">
			<AdvancedMovieSearch
				fetchFiltredMovies={fetchFiltredMovies}
				setFilters={setFilters}
				genres={convertGenres}
			/>
			{showSpinner ? (
				<Spinner />
			) : (
				MovieListRender(
					movieList,
					fetchFiltredMovies,
					setMovieSeries,
					loadMoreFiltredMovie,
					filters,
					setNewRateInfo
				)
			)}
		</div>
	) : (
		<Spinner />
	);
};

const mapStateToProps = (rootState, props) => ({
	isAuthorized: !!rootState.profile.profileInfo,
	userInfo: rootState.profile.profileInfo,
	movieList: rootState.movie.movieSearchInAdvancedSearch,
	filters: rootState.movie.filters,
	showSpinner: rootState.movie.showSpinner,
	genres: rootState.movie.genres
});
const actions = {
	fetchFiltredMovies,
	setMovieSeries,
	loadMoreFiltredMovie,
	setFilters,
	getGenres,
	setNewRateInfo
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdvancedSearchPage);
