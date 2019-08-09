import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import MainPageSidebar from "../../components/shared/MainSidebar/MainPageSidebar";
import MovieList from '../../components/MovieList/MovieList';


import NotFound from './../../components/NotFound/NotFound';
import "./MainContainer.scss";
import MainPage from "../../components/MainPage/MainPage";
import UserPage from "../../components/UserPage/UserPage";
import MovieSeriesPage from "../../components/MovieSeriesPage/MovieSeriesPage";

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Spinner from "../../components/shared/Spinner";
import {fetchMovieList} from "../../components/MovieSeriesPage/Movie.redux/actions";

const {notifications} = {
    notifications: {
        newFriends: 12,
        newMessages: 0,
        newEvents: 2
    }
};
type Movie = {
    id: string,
    title: string,
    year?: number,
    image: string,
    duration: string,
    genres: Array<string>,
    cast: Array<string>
}
type userInfo = {
    name: string,
    image: string,
    any
}

interface IProps {
    isAuthorized: boolean,
    userInfo: userInfo,
    movieList: null | Array<Movie>,
    fetchMovieList: () => any
}

const MovieListRender = (movieList, fetchMovieList) => {
    if (!movieList) {
        fetchMovieList();
        return <Spinner/>
    }
    return <MovieList movies={movieList}/>
};
const Main = ({isAuthorized, userInfo, movieList, fetchMovieList}: IProps) => {
    if (!isAuthorized || !localStorage.getItem('token'))
        return <Redirect to="/login"/>;
    return (
        <div className="main-page">
            <MainPageSidebar userInfo={userInfo} notifications={notifications}/>
            <div>
                <Switch>
                    <Route exact path={`/`} component={MainPage}/>
                    <Route path={`/user-page`} component={UserPage}/>
                    <Route path={`/movie-series`} component={MovieSeriesPage}/>
                    <Route path={`/movie-list`} render={() => MovieListRender(movieList, fetchMovieList)}/>
                    <Route path={`/*`} exact component={NotFound}/>
                </Switch>
            </div>
        </div>
    );
};


const mapStateToProps = (rootState, props) => ({
    ...props,
    isAuthorized: !!rootState.profile.profileInfo,
    userInfo: rootState.profile.profileInfo,
    movieList: rootState.movie.movieList
});


const actions = {
    fetchMovieList
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);