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

const {notifications} = {
    notifications: {
        newFriends: 12,
        newMessages: 0,
        newEvents: 2
    }
}

type userInfo = {
    name: string,
    image: string,
    any
}
const movies = [
    {
        id: '8c0bb20f-fc81-473b-8a73-5ae2125fe603',
        title: 'Titanic',
        year: 1975,
        image: 'https://images-na.ssl-images-amazon.com/images/I/51gEpO63aRL.jpg',
        duration: '3h 21min',
        genres: ['Drama', 'Action', 'Family'],
        cast: ['leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio']
    },
    {
        id: '8c0bb1ef-fc81-473b-8a73-5ae2125fe603',
        title: 'Forrest Gump',
        year: 1975,
        image: 'https://posteritati.com/posters/000/000/053/106/forrest-gump-md-web.jpg',
        duration: '1h 33min',
        genres: ['Drama'],
        cast: ['leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio']
    },
    {
        id: '8c0bb20f-fc81-423b-8a73-5ae2125fe603',
        title: 'Titanic1',
        year: 1975,
        image: 'https://images-na.ssl-images-amazon.com/images/I/51gEpO63aRL.jpg',
        duration: '3h 21min',
        genres: ['Drama', 'Action', 'Family'],
        cast: ['leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio']
    },
    {
        id: '8c0bb1ef-fc11-473b-8a73-5ae2125fe603',
        title: 'Forrest Gump12',
        year: 1975,
        image: 'https://posteritati.com/posters/000/000/053/106/forrest-gump-md-web.jpg',
        duration: '1h 13min',
        genres: ['Drama'],
        cast: ['leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio']
    },
    {
        id: '8c0bb20f-fc81-473b-8a73-5ae2121fe603',
        title: 'Titanic',
        year: 1975,
        image: 'https://images-na.ssl-images-amazon.com/images/I/51gEpO63aRL.jpg',
        duration: '3h 21min',
        genres: ['Drama', 'Action', 'Family'],
        cast: ['leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio']
    },
    {
        id: '8c0bb1ef-fc81-473b-8a73-5ae2125fe60a',
        title: 'Forrest Gump',
        year: 1975,
        image: 'https://posteritati.com/posters/000/000/053/106/forrest-gump-md-web.jpg',
        duration: '1h 33min',
        genres: ['Drama'],
        cast: ['leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio']
    }
];

const Main = ({isAuthorized, userInfo}: { isAuthorized: boolean, userInfo: userInfo}) => {
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
                    <Route path={`/movie-list`} render={() => <MovieList movies={movies}/>}/>
                    <Route path={`/*`} exact component={NotFound}/>
                </Switch>
            </div>
        </div>
    );
};


const mapStateToProps = (rootState, props) => ({
    ...props,
    isAuthorized: !!rootState.profile.profileInfo,
    userInfo: rootState.profile.profileInfo
});


const actions = {};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);