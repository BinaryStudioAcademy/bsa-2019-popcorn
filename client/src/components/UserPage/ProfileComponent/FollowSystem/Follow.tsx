import React from 'react';
import { connect } from 'react-redux';

interface IFollowProps {
	userId: string;
	currentUserId: string;
	followersCount: number;
	followingsCount: number;
}

const Follow: React.FC<IFollowProps> = props => {
	const { followersCount, followingsCount } = props;
	return (
		<div>
			followers: {followersCount}
			followings: {followingsCount}
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	currentUserId: rootState.profile.profileInfo.id,
	followersCount: rootState.follow.followersCount,
	followingsCount: rootState.follow.followingsCount
});

export default connect(mapStateToProps)(Follow);
