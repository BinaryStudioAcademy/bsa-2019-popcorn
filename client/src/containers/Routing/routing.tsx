import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../../components/authorization/Login/Login';
import Registration from '../../components/authorization/Registration/index';
import Main from './../Main/main';
import NotFound from './../../components/NotFound/NotFound';
import ConfirmChange from '../../components/ConfirmChange/ConfirmChange';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	authorize,
	fetchByToken,
	fetchResetPassword,
	fetchRestorePassword,
	registration
} from '../../components/authorization/actions';
import { confirmChanges } from '../../components/ConfirmChange/actions';
import Spinner from '../../components/shared/Spinner/index';
import Reset from '../../components/authorization/Reset';
import Restore from '../../components/authorization/Restore';
import StoryVotingCreation from '../../components/StoryVotingCreation/StoryVotingCreation';

interface IValues {
	email: string;
	password: string;
}

interface Values {
	email: string;
	password: string;
	name: string;
}

interface IProps {
	registration: (values: Values) => any;
	isAuthorized: boolean;
	authorize: (values: IValues) => any;
	fetchByToken: (token: string) => any;
	loginError: string | null;
	registerError: string | null;
	fetchResetPassword: (email: string) => any;
	resetMessage: string;
	restoreMessage: string;
	fetchRestorePassword: (password: string, token: string) => any;
	confirmChanges: (token: string) => any;
}

const Routing = ({
	isAuthorized,
	authorize,
	fetchByToken,
	registration,
	resetMessage,
	loginError,
	registerError,
	fetchResetPassword,
	restoreMessage,
	fetchRestorePassword,
	confirmChanges
}: IProps) => {
	const token = localStorage.getItem('token');
	if (token && !isAuthorized) {
		fetchByToken(token);
		return <Spinner />;
	}
	return (
		<div className="main-content">
			<Switch>
				<Route
					exact
					path="/login"
					component={() => (
						<Login
							loginError={loginError}
							isAuthorized={isAuthorized}
							onSubmit={authorize}
						/>
					)}
				/>
				<Route
					exact
					path="/registration"
					component={() => (
						<Registration
							registerError={registerError}
							isAuthorized={isAuthorized}
							registration={registration}
						/>
					)}
				/>
				<Route
					exact
					path="/reset"
					component={() => (
						<Reset
							isAuthorized={isAuthorized}
							fetchResetPassword={fetchResetPassword}
							resetMessage={resetMessage}
						/>
					)}
				/>
				<Route
					path="/reset/:token"
					component={props => (
						<Restore
							{...props}
							isAuthorized={isAuthorized}
							fetchRestorePassword={fetchRestorePassword}
							restoreMessage={restoreMessage}
						/>
					)}
				/>
				<Route
					path="/confirm/:token"
					component={props => <ConfirmChange confirm={confirmChanges} />}
				/>
				<Route path="/" component={Main} />
				{/* Not found route */}
				<Route path="*" exact component={NotFound} />
			</Switch>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	isAuthorized: !!rootState.profile.profileInfo,
	loginError: rootState.profile.loginError,
	registerError: rootState.profile.registerError,
	resetMessage: rootState.profile.resetMessage,
	restoreMessage: rootState.profile.restoreMessage
});

const actions = {
	authorize,
	fetchByToken,
	registration,
	fetchResetPassword,
	fetchRestorePassword,
	confirmChanges
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Routing);
