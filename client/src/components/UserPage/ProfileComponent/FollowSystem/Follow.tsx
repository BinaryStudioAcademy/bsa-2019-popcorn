import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface IFollowProps {
	userId: string;
	currentUserId: string;
}

const Follow: React.FC<IFollowProps> = props => {
	return <div>follow</div>;
};

const mapStateToProps = (rootState, props) => ({
	...props,
	currentUserId: rootState.profile.profileInfo.id
});

const actions = {};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Follow);
