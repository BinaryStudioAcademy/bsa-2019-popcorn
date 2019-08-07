import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import UserPage from './components/UserPage/UserPage';
import MovieSeriesPage from './components/MovieSeriesPage/MovieSeriesPage';
import "./styles/App.scss";
import FilmBasicTab from "./components/FilmBasicTabComponent/FilmBasicTabComponent";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <FilmBasicTab />
      <Switch>
        <Route path="/user" component={UserPage} />
        <Route path="/movie-series-page" component={MovieSeriesPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
