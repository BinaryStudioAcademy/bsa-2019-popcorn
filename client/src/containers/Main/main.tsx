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
import EventList from '../../components/EventPage/EventList';
import AdminPanelPage from '../../components/AdminPanelPage/AdminPanelPage';
import SurveyPage from '../../components/SurveyPage/SurveyPage';
import TopPage from '../../components/TopPage/TopPage';
import AdvancedSearchPage from '../../components/AdvancedSearch/AdvancedSearchPage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../../components/shared/Spinner';
import {
	fetchMovieList,
	loadMoreMovie,
	setMovieSeries
} from '../../components/MovieSeriesPage/Movie.redux/actions';
import {
	getAllEvents,
	getEventById,
	subscibeToEvent
} from '../../components/UserPage/UserEvents/actions';
import Header from '../../components/shared/Header/Header';
import UserSurveysNav from '../../components/UserPage/UserSurveys/UserSurveysNav';
import SocketService from '../../services/socket.service';
import TMovie from '../../components/MovieSeriesPage/TMovie';
import { IEventFormatDataBase } from '../../components/UserPage/UserEvents/UserEvents.service';
import TopList from '../../components/TopListPage/TopList';
import SettingsPage from '../../components/UserSettings';
import ChatPage from '../../components/ChatPage/ChatPage';
import UserMovieList from '../../components/UserMovieList/UserMovieList';
import ResultList from '../../components/shared/ContentSearch/ResultList';
import Collections from '../../components/Collections/Collections';
import AdviceMe from '../../components/shared/AdviceMe';
import { fetchChats } from '../../components/ChatPage/ChatPage.redux/actions';

const { notifications } = {
	notifications: {
		newMessages: 0,
		newEvents: 2
	}
};
type userInfo = {
	id: string;
	name: string;
	avatar: string;
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
	getAllEvents: () => void;
	allEvents: IEventFormatDataBase[];
	searchedEvent: IEventFormatDataBase;
	getEventById: (eventId: string) => void;
	subscibeToEvent: ({ eventId, userId, status }) => void;
	avatar: string;
	chats: any;
	fetchChats: (userId: string) => void;
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
			loadMoreMovie={loadMoreMovie}
		/>
	);
};

const MovieSeriesRender = props => {
	return <MovieSeriesPage {...props} />;
};

const allSurveysRender = props => {
	return (
		<UserSurveysNav id={props.id} userInfo={props} mainPath={'/surveys'} />
	);
};

const EventPageRender = props => <EventPage {...props} />;
const EventListRender = props => <EventList {...props} />;

const Main = ({
	isAuthorized,
	userInfo,
	movieList,
	fetchMovieList,
	setMovieSeries,
	movieSeries,
	loadMoreMovie,
	allEvents,
	getAllEvents,
	searchedEvent,
	getEventById,
	subscibeToEvent,
	avatar,
	chats,
	fetchChats,
	...props
}: IProps) => {
	if (!isAuthorized || !localStorage.getItem('token')) {
		return <Redirect to="/login" />;
	}

	if (!chats) {
		fetchChats(userInfo.id);
	}

	new SocketService(userInfo.id);

	console.log(props);
	return (
		<div className={'main-wrap'}>
			{isAuthorized ? <Header userInfo={userInfo} /> : null}
			<div
				className={
					window.location.pathname === '/advanced-search'
						? 'main-page-search'
						: 'main-page'
				}
			>
				{window.location.pathname !== '/advanced-search' ? (
					<MainPageSidebar chats={chats} notifications={notifications} />
				) : null}
				<div
				// style={{ width: 'calc(100vw - 205px)' }}
				>
					<Switch>
						<Route exact path={[`/`, '/create*']} component={MainPage} />
						<Route path={`/user-page/:id`} component={UserPage} />
						<Route
							path={'/settings'}
							render={() => <SettingsPage mainPath={'/settings'} />}
						/>
						<Route path={'/content-search'} component={ResultList} />
						<Route
							path={`/events/:id`}
							render={props =>
								EventPageRender({
									...props,
									searchedEvent,
									getEventById,
									currentUser: userInfo,
									subscibeToEvent
								})
							}
						/>
						<Route
							path={`/events`}
							render={props =>
								EventListRender({ ...props, allEvents, getAllEvents })
							}
						/>
						<Route path={`/advanced-search`} component={AdvancedSearchPage} />
						<Route path={`/survey-page/:id`} component={SurveyPage} />
						<Route path={`/admin-panel-page`} component={AdminPanelPage} />
						<Route
							path={`/movies/:id`}
							render={props => MovieSeriesRender(props)}
						/>
						<Route
							path={`/movies`}
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
							path={`/surveys`}
							render={() => allSurveysRender(userInfo)}
						/>
						<Route exact path={`/tops`} render={() => <TopList />} />
						<Route path={`/tops/:id`} component={TopPage} />
						<Route path={`/chat`} component={ChatPage} />
						<Route path={`/movie-list/:id`} component={UserMovieList} />
						<Route path={`/collections`} component={Collections} />
						<Route path={'/adviceMe'} component={AdviceMe} />
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
	movieSeries: rootState.movie.movieSeries,
	allEvents: rootState.events.allEvents,
	searchedEvent: rootState.events.searchedEvent,
	chats: rootState.chat.chats
});

const actions = {
	fetchMovieList,
	setMovieSeries,
	loadMoreMovie,
	getAllEvents,
	getEventById,
	subscibeToEvent,
	fetchChats
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);
