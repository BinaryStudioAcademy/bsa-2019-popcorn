import React, { useState } from 'react';
import { connect } from 'react-redux';
import { changeStatus } from '../FollowSystem.redux/actions';
import { bindActionCreators } from 'redux';

interface IProps {
	followStatus: { isFollower: boolean; isFollowing: boolean };
	changeStatus: (userId: string, followerId: string) => any;
	userId: string;
	selectedUserId: string;
}

const FollowButton: React.FC<IProps> = props => {
	const chooseTitle = () => {
		const { isFollower, isFollowing } = props.followStatus;
		if (isFollowing) return 'Unfollow';
		if (isFollower) return 'Follow Back';
		return 'Follow';
	};

	const onFollowClick = () => {
		props.changeStatus(props.userId, props.selectedUserId);
	};

	const [className, setClassName] = useState('hidden');
	if (!props.followStatus) return <div />;
	return (
		<button className="follow-btn" onClick={onFollowClick}>
			{chooseTitle()}
		</button>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	followStatus: rootState.follow.followStatus,
	userId: rootState.profile.profileInfo.id,
	selectedUserId: rootState.profile.selectedProfileInfo.id
});

const actions = {
	changeStatus
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FollowButton);
