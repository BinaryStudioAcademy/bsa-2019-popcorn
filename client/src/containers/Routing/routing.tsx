import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from "../../components/authorization/Login/Login";
import Registration from "../../components/authorization/Registration/index";
import Header from "../../components/shared/Header/Header";
import Main from "./../Main/main";
import NotFound from './../../components/NotFound/NotFound';

const Routing = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Registration} />
                <Route path="/" component={Main} />
                {/* Not found route */}
                <Route path="*" exact component={NotFound} />
            </Switch>
        </div>

    );
};

export default Routing;