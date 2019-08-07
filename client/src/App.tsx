import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import UserPage from './components/UserPage/UserPage';
import MovieSeriesPage from './components/MovieSeriesPage/MovieSeriesPage';
import "./styles/App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/user" component={UserPage} />
        <Route path="/movie-series-page" component={MovieSeriesPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
