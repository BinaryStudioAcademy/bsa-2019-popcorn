import React from 'react';
import UserPageTabs from './UserPageTabs';
import UserPageTabBody from './UserPageTabBody';
import './UserPage.scss';
import { getSelectedUserInfo } from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../shared/Spinner';
import { Redirect } from 'react-router';

interface IProps {
	match: {
		path: string;
		params: any;
	};
	getSelectedUserInfo: (id: string) => any;
	selectedProfileInfo: any;
}

const User: React.SFC<IProps> = ({
	match,
	getSelectedUserInfo,
	selectedProfileInfo
}) => {
	if (match.params.id) {
		if (selectedProfileInfo && match.params.id !== selectedProfileInfo.id) {
			getSelectedUserInfo(match.params.id);
			return <Spinner />;
		} else if (selectedProfileInfo === null) {
			getSelectedUserInfo(match.params.id);
			return <Spinner />;
		}
	}
	const mainPath = `/user-page/${match.params.id}`;

	return selectedProfileInfo ? (
		<div className={'user'}>
			<UserPageTabs mainPath={mainPath} />
			<UserPageTabBody mainPath={mainPath} />
		</div>
	) : (
		<Redirect to={'/'} />
	);
};

const mapStateToProps = (rootState, props) => ({
	selectedProfileInfo: rootState.profile.selectedProfileInfo
});

const actions = {
	getSelectedUserInfo
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User);
