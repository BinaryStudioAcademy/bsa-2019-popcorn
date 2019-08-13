import React from 'react';
import './styles/App.scss';
import Routing from './containers/Routing/routing';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ErrorBoundary from './components/shared/ErrorBoundary/ErrorBoundary';

const App: React.FC = () => {
	return (
		<ErrorBoundary>
			<Provider store={store}>
				<Router>
					<Routing />
				</Router>
			</Provider>
		</ErrorBoundary>
	);
};

export default App;
{
	/* <div className="App">
<FilmBasicTab />
<Switch>
  <Route path="/user" component={UserPage} />
  <Route path="/movie-series-page" component={MovieSeriesPage} />
  <Redirect to="/" />
</Switch>
</div> */
}
