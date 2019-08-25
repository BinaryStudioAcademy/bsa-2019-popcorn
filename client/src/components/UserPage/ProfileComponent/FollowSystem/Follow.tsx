import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

interface IFollowProps {
	userId: string;
	currentUserId: string;
	followersCount: number;
	followingsCount: number;
}

const Follow: React.FC<IFollowProps> = props => {
	const [isModalShown, setModalShown] = useState(false);
	const [isFollowerModal, setFollowerModal] = useState(false);
	const { followersCount, followingsCount } = props;

	const openModal = isFollowerModal => {
		setFollowerModal(isFollowerModal);
		setModalShown(true);
	};

	const closeModal = () => {
		setModalShown(false);
	};

	return (
		<div>
			<div onClick={() => openModal(true)}>followers: {followersCount}</div>
			<div onClick={() => openModal(false)}>followings: {followingsCount}</div>
			<Modal
				open={isModalShown}
				onClose={closeModal}
				showCloseIcon={false}
				focusTrapped={false}
				center
				classNames={{
					modal: '' //todo
				}}
			>
				{isFollowerModal ? 'Followers' : 'Followings'}
			</Modal>
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
