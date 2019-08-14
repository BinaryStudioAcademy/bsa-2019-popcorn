import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainPageSidebar from '../../components/shared/MainSidebar/MainPageSidebar';
import MovieList from '../../components/MovieList/MovieList';

import NotFound from './../../components/NotFound/NotFound';
import './MainContainer.scss';
import MainPage from '../../components/MainPage/MainPage';
import UserPage from '../../components/UserPage/UserPage';
import MovieSeriesPage from '../../components/MovieSeriesPage/MovieSeriesPage';
import EventPage from '../../components/EventPage/EventPage';
import AdminPanelPage from '../../components/AdminPanelPage/AdminPanelPage';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../../components/shared/Spinner';
import {
	fetchMovieList,
	setMovieSeries
} from '../../components/MovieSeriesPage/Movie.redux/actions';
import Header from '../../components/shared/Header/Header';
import UserTops from '../../components/UserPage/UserTops/UserTops';

const { notifications } = {
	notifications: {
		newMessages: 0,
		newEvents: 2
	}
};
type Movie = {
	id: string;
	title: string;
	year?: number;
	image: string;
	duration: string;
	genres: Array<string>;
	cast: Array<string>;
};
type userInfo = {
	name: string;
	image: string;
	any;
};

interface IProps {
	isAuthorized: boolean;
	userInfo: userInfo;
	movieList: null | Array<Movie>;
	fetchMovieList: () => any;
	setMovieSeries: (movie: any) => any;
	movieSeries: null | Movie;
}

const MovieListRender = (movieList, fetchMovieList, setMovieSeries) => {
	if (!movieList) {
		fetchMovieList();
		return <Spinner />;
	}
	return <MovieList movies={movieList} setMovieSeries={setMovieSeries} />;
};

const Main = ({
	isAuthorized,
	userInfo,
	movieList,
	fetchMovieList,
	setMovieSeries,
	movieSeries
}: IProps) => {
	if (!isAuthorized || !localStorage.getItem('token'))
		return <Redirect to="/login" />;
	return (
		<div>
			{isAuthorized ? <Header userInfo={userInfo} /> : null}

			<div className="main-page">
				<MainPageSidebar notifications={notifications} />
				<div>
					<Switch>
						<Route exact path={[`/`, '/create*']} component={MainPage} />
						<Route path={`/user-page`} component={UserPage} />
						<Route path={`/event-page`} component={EventPage} />
						<Route path={`/admin-panel-page`} component={AdminPanelPage} />
						<Route
							path={`/movie-series`}
							render={() => <MovieSeriesPage movie={movieSeries} />}
						/>
						<Route
							path={`/movie-list`}
							render={() =>
								MovieListRender(movieList, fetchMovieList, setMovieSeries)
							}
						/>
						<Route path={`/movie-tops`} render={() => <UserTops />} />
						<Route path={`/*`} exact component={NotFound} />
					</Switch>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	isAuthorized: !!rootState.profile.profileInfo,
	userInfo: rootState.profile.profileInfo,
	movieList: rootState.movie.movieList,
	movieSeries: rootState.movie.movieSeries
});

const actions = {
	fetchMovieList,
	setMovieSeries
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);
