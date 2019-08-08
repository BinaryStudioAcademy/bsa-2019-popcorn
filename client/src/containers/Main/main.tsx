import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from "./../../components/MainPage/MainPage";
import UserPage from "./../../components/UserPage/UserPage";
import MovieSeriesPage from "./../../components/MovieSeriesPage/MovieSeriesPage";
import MainPageSidebar from "./../../components/MainPageSidebar/MainPageSidebar";
import MovieList from './../../components/MovieList/MovieList';
import ProfileComponent from './../../components/ProfileComponent/ProfileComponent';
import NotFound from './../../components/NotFound/NotFound';
import "./MainContainer.scss";

const { userInfo, notifications } = {
    userInfo: {
        name: "Sofi Dub",
        image: "https://s3-alpha-sig.figma.com/img/919e/1a5a/da4f250d469108191ad9d4af68b2a639?Expires=1566172800&Signature=Kou41Z8bd8ig~9nLibgCH5gfaOc0K~9Io82-umabjJnomveXbPcqMWfD911bHy6h77reHT6ecNYFHCzmXkQNy3vEF-OzgJYgV875TI2rX~cPt1FaSJC5wCeybEfTrlBlCcdzSFn8iVcP~C8GTx-l6CIjyugGAhvr7xJ-hfAdlf~5Mll0Sy92dSKn8q7OkJdfsMvEEFVQ3rGHn8GGQZg1a60gif0VaQhuVX1gcRgwrsak~cerS1bnDvo93B1lFOIk85wlhY2hPwQrmCtI9A-qaAtbIxmzmxkRpuVUpDrX6Jd4hXpksbd7urSJ91Dg7tv9WzRZvIkLnPXflCfmPw~slw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
    },
    notifications: {
        newFriends: 12,
        newMessages: 0,
        newEvents: 2
    }
}

const movies = [
    {
      id: '8c0bb20f-fc81-473b-8a73-5ae2125fe603', 
      title: 'Titanic',
      year: new Date(),
      image: 'https://images-na.ssl-images-amazon.com/images/I/51gEpO63aRL.jpg',
      duration: '3h 21min',
      genres: ['Drama', 'Action', 'Family'],
      cast: ['leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio']
    },
    {
      id: '8c0bb1ef-fc81-473b-8a73-5ae2125fe603', 
      title: 'Forrest Gump',
      year: new Date(),
      image: 'https://posteritati.com/posters/000/000/053/106/forrest-gump-md-web.jpg',
      duration: '1h 33min',
      genres: ['Drama'],
      cast: ['leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio']
    },
    {
      id: '8c0bb20f-fc81-423b-8a73-5ae2125fe603', 
      title: 'Titanic1',
      year: new Date(),
      image: 'https://images-na.ssl-images-amazon.com/images/I/51gEpO63aRL.jpg',
      duration: '3h 21min',
      genres: ['Drama', 'Action', 'Family'],
      cast: ['leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio']
    },
    {
      id: '8c0bb1ef-fc11-473b-8a73-5ae2125fe603', 
      title: 'Forrest Gump12',
      year: new Date(),
      image: 'https://posteritati.com/posters/000/000/053/106/forrest-gump-md-web.jpg',
      duration: '1h 13min',
      genres: ['Drama'],
      cast: ['leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio']
    },
    {
      id: '8c0bb20f-fc81-473b-8a73-5ae2121fe603', 
      title: 'Titanic',
      year: new Date(),
      image: 'https://images-na.ssl-images-amazon.com/images/I/51gEpO63aRL.jpg',
      duration: '3h 21min',
      genres: ['Drama', 'Action', 'Family'],
      cast: ['leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio']
    },
    {
      id: '8c0bb1ef-fc81-473b-8a73-5ae2125fe60a', 
      title: 'Forrest Gump',
      year: new Date(),
      image: 'https://posteritati.com/posters/000/000/053/106/forrest-gump-md-web.jpg',
      duration: '1h 33min',
      genres: ['Drama'],
      cast: ['leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio', 'leonardo dicaprio']
    }
  ];

const Main = () => {
    return (
        <div className="main-page">
            <MainPageSidebar userInfo={userInfo} notifications={notifications} />
            <div>
                <Switch>
                    <Route exact path={`/`} component={MainPage} />
                    <Route path={`/user-page`} component={UserPage} />
                    <Route path={`/movie-series`} component={MovieSeriesPage} />
                    <Route path={`/movie-list`} render={() => <MovieList movies={movies}/>}/>
                    <Route path={`/*`} exact component={NotFound} />
                </Switch>
            </div>
        </div>
    );
};

export default Main;