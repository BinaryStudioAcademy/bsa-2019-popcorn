import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import {
	fetchFollowers,
	clearFollows,
	fetchFollowings
} from './FollowSystem.redux/actions';
import { bindActionCreators } from 'redux';
import './Follow.scss';

interface IFollowProps {
	userId: string;
	currentUserId: string;
	followersCount: number;
	followingsCount: number;
	fetchFollowers: (userId: string) => any;
	clearFollows: (userId: string) => any;
	fetchFollowings: (userId: string) => any;
	followSystem: any; //todo
}

const Follow: React.FC<IFollowProps> = props => {
	const [isModalShown, setModalShown] = useState(false);
	const [modalType, setModalType] = useState<'followers' | 'followings'>(
		'followers'
	);
	const { followersCount, followingsCount } = props;

	const openModal = modalType => {
		setModalType(modalType);
		setModalShown(true);
		switch (modalType) {
			case 'followers':
				props.fetchFollowers(props.userId);
				break;
			case 'followings':
				props.fetchFollowings(props.userId);
				break;
			default:
				break;
		}
	};

	const closeModal = () => {
		setModalShown(false);
		props.clearFollows(props.userId);
	};

	return (
		<div>
			<div onClick={() => openModal('followers')}>
				followers: {followersCount}
			</div>
			<div onClick={() => openModal('followings')}>
				followings: {followingsCount}
			</div>
			{isModalShown && (
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
					<div>{modalType}</div>
					{!(
						props.followSystem &&
						props.followSystem[props.userId] &&
						props.followSystem[props.userId][modalType]
					) ? (
						<div>Loading ...</div>
					) : (
						<div>
							{props.followSystem[props.userId][modalType].map(follower => {
								return modalType === 'followers' ? (
									<div key={follower.follower.id}>{follower.follower.name}</div>
								) : (
									<div key={follower.user.id}>{follower.user.name}</div>
								);
							})}
						</div>
					)}
				</Modal>
			)}
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	currentUserId: rootState.profile.profileInfo.id,
	followersCount: rootState.follow.followersCount,
	followingsCount: rootState.follow.followingsCount,
	followSystem: rootState.follow.followSystem
});

const actions = {
	fetchFollowers,
	fetchFollowings,
	clearFollows
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Follow);
