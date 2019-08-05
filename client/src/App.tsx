import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import User from './components/UserPage/UserPage';
import "./styles/App.scss";

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
