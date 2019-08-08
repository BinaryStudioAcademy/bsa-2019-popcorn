import React from "react";
import "./styles/App.scss";
import {Provider} from 'react-redux';
import Routing from "./containers/Routing/routing";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserPage from './components/UserPage/UserPage';

const App: React.FC = () => {
  return (
    <Router>
      <Route component={UserPage} match={{path: "/userpage"}} path='/userpage'/> 
      
    </Router>
  );
};

export default App;
{/* <div className="App">
<FilmBasicTab />
<Switch>
  <Route path="/user" component={UserPage} />
  <Route path="/movie-series-page" component={MovieSeriesPage} />
  <Redirect to="/" />
</Switch>
</div> */}
