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
import SurveyPage from '../../components/SurveyPage/SurveyPage';
import TopPage from '../../components/TopPage/TopPage';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../../components/shared/Spinner';
import {
	fetchMovieList,
	loadMoreMovie,
	setMovieSeries
} from '../../components/MovieSeriesPage/Movie.redux/actions';
import Header from '../../components/shared/Header/Header';
import UserTops from '../../components/UserPage/UserTops/UserTops';
import UserSurveysNav from '../../components/UserPage/UserSurveys/UserSurveysNav';
import SocketService from '../../services/socket.service';
import TMovie from '../../components/MovieSeriesPage/TMovie';

const { notifications } = {
	notifications: {
		newMessages: 0,
		newEvents: 2
	}
};
type userInfo = {
	id: string;
	name: string;
	image: string;
	any;
};

interface IProps {
	isAuthorized: boolean;
	userInfo: userInfo;
	movieList: null | Array<TMovie>;
	fetchMovieList: () => any;
	setMovieSeries: (movie: any) => any;
	movieSeries: null | TMovie;
	loadMoreMovie: (size: number, from: number) => any;
}

const MovieListRender = (
	movieList,
	fetchMovieList,
	setMovieSeries,
	loadMoreMovie
) => {
	if (!movieList) {
		fetchMovieList();
		return <Spinner />;
	}
	return (
		<MovieList
			movies={movieList}
			setMovieSeries={setMovieSeries}
			twoColumns={true}
			loadMoreMovie={loadMoreMovie}
		/>
	);
};

const MovieSeriesRender = props => {
	return <MovieSeriesPage {...props} />;
};

const allSurveysRender = props => {
	return (
		<UserSurveysNav
			id={props.id}
			userInfo={props}
			mainPath={'/surveys-list/'}
			type="all"
		/>
	);
};

const Main = ({
	isAuthorized,
	userInfo,
	movieList,
	fetchMovieList,
	setMovieSeries,
	movieSeries,
	loadMoreMovie
}: IProps) => {
	if (!isAuthorized || !localStorage.getItem('token'))
		return <Redirect to="/login" />;

	new SocketService(userInfo.id);

	return (
		<div className={'main-wrap'}>
			{isAuthorized ? <Header userInfo={userInfo} /> : null}
			<div className="main-page">
				<MainPageSidebar notifications={notifications} />
				<div>
					<Switch>
						<Route exact path={[`/`, '/create*']} component={MainPage} />
						<Route path={`/user-page/:id`} component={UserPage} />
						<Route path={`/event-page`} component={EventPage} />

						<Route path={`/survey-page/:id`} component={SurveyPage} />
						<Route path={`/admin-panel-page`} component={AdminPanelPage} />
						<Route
							path={`/movie-series/:id`}
							render={props => MovieSeriesRender(props)}
						/>
						<Route
							path={`/movie-list`}
							render={() =>
								MovieListRender(
									movieList,
									fetchMovieList,
									setMovieSeries,
									loadMoreMovie
								)
							}
						/>
						<Route
							path={`/surveys-list`}
							render={() => allSurveysRender(userInfo)}
						></Route>
						<Route path={`/movie-tops`} render={() => <UserTops />} />
						<Route path={`/top-page/:id`} component={TopPage} />
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
	setMovieSeries,
	loadMoreMovie
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);
