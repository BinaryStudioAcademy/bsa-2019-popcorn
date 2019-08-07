import React from "react";
import "./styles/App.scss";
import Routing from "./containers/Routing/routing";
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routing />
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