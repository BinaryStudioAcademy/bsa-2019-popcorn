import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import "./styles/App.scss";

import User from './components/UserPage/UserPage';


const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/user" component={User} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
