import React, { useState } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

interface IProps {
	followStatus: { isFollower: boolean; isFollowing: boolean };
}

const FollowButton: React.FC<IProps> = props => {
	const chooseTitle = () => {
		const { isFollower, isFollowing } = props.followStatus;
		if (isFollowing) return 'Unfollow';
		if (isFollower) return 'Follow Back';
		return 'Follow';
	};

	const [className, setClassName] = useState('hidden');
	if (!props.followStatus) return <div />;
	return <button className="follow-btn">{chooseTitle()}</button>;
};

const mapStateToProps = (rootState, props) => ({
	...props,
	followStatus: rootState.follow.followStatus
});

const actions = {};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FollowButton);
