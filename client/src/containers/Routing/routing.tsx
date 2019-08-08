import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from "../../components/authorizationPage/Login/Login";
import Registration from "../../components/authorizationPage/Registration/index";
import Header from "../../components/shared/Header/Header";
import Main from "./../Main/main";

const Routing = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Registration} />
                <Route path="/" component={Main} />
                {/* Not found route */}
                <Route component={Main} />
            </Switch>
        </div>

    );
};

export default Routing;