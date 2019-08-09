import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from "../../components/authorization/Login/Login";
import Registration from "../../components/authorization/Registration/index";
import Main from "./../Main/main";
import NotFound from './../../components/NotFound/NotFound';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authorize, fetchByToken, registration} from '../../components/authorization/actions';

import Spinner from '../../components/shared/Spinner/index';
import Header from "../../components/shared/Header/Header";

interface IValues {
    email: string;
    password: string;
}

interface Values {
    email: string;
    password: string;
    name: string
}

const Routing = ({isAuthorized, authorize, fetchByToken, registration}: { registration: (values: Values) => any, isAuthorized: boolean, authorize: (values: IValues) => any, fetchByToken: (token: string) => any }) => {
    const token = localStorage.getItem('token');
    console.log(token, isAuthorized)
    if (token && !isAuthorized) {
        fetchByToken(token);
        return <Spinner/>
    }
    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path="/login" component={() => <Login isAuthorized={isAuthorized} onSubmit={authorize}/>}/>
                <Route exact path="/registration"
                       component={() => <Registration isAuthorized={isAuthorized} registration={registration}/>}/>
                <Route path="/" component={Main}/>
                {/* Not found route */}
                <Route path="*" exact component={NotFound}/>
            </Switch>
        </div>

    );
};


const mapStateToProps = (rootState, props) => ({
    ...props,
    isAuthorized: !!rootState.profile.profileInfo

});

const actions = {
    authorize,
    fetchByToken,
    registration
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Routing);