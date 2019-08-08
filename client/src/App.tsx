import React from "react";
import "./styles/App.scss";
import {Provider} from 'react-redux';
import Routing from "./containers/Routing/routing";
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from "react-redux";
import store from './redux/store';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routing/>
            </Router>
        </Provider>
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
</div> */
}
