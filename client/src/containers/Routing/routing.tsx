import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from "./../../components/Login/Login";
import Registration from "./../../components/Registration/index";
import MainPage from "./../../components/MainPage/MainPage";
const Routing = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/registration" component={Registration}/>
            <Route exact path="/" component={MainPage}/>
            {/* Not found route */}
            <Route component={MainPage}/>
        </Switch>
    );
};

export default Routing;