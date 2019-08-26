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
	const setButton = () => {
		const { isFollower, isFollowing } = props.followStatus;
		let newTitle;
		if (isFollowing) newTitle = 'Unfollow';
		else if (isFollower) newTitle = 'Follow Back';
		else newTitle = 'Follow';
		if (newTitle !== title) {
			setTitle(newTitle);
			setClassName('follow-btn');
		}
	};

	const onFollowClick = () => {
		setClassName('follow-btn disable');
		props.changeStatus(props.userId, props.selectedUserId);
	};

	const [className, setClassName] = useState('follow-btn');
	const [title, setTitle] = useState('Follow');
	setButton();

	if (!props.followStatus) return <div />;
	return (
		<button className={className} onClick={onFollowClick}>
			{title}
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
