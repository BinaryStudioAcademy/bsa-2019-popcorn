import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { NavLink } from 'react-router-dom';
import {
	fetchFollowers,
	clearFollows,
	fetchFollowings
} from './FollowSystem.redux/actions';
import { bindActionCreators } from 'redux';
import './Follow.scss';
import Image from '../../../shared/Image/Image';
import config from '../../../../config';

interface IFollowProps {
	userId: string;
	currentUserId: string;
	followersCount: number;
	followingsCount: number;
	fetchFollowers: (userId: string) => any;
	clearFollows: (userId: string) => any;
	fetchFollowings: (userId: string) => any;
	followSystem: any;
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
			<div className="follow-wrp">
				<div
					className="follow-counter-wrp"
					onClick={() => openModal('followers')}
				>
					<div className="follow-counter">{followersCount}</div>
					followers
				</div>
				<div
					className="follow-counter-wrp"
					onClick={() => openModal('followings')}
				>
					<div className="follow-counter">{followingsCount}</div>
					followings
				</div>
			</div>
			{isModalShown && (
				<Modal
					open={isModalShown}
					onClose={closeModal}
					showCloseIcon={true}
					focusTrapped={false}
					center
					classNames={{
						modal: 'follow-modal',
						closeButton: 'follow-modal-close'
					}}
				>
					<div className="modal-title">{modalType}</div>
					{!(
						props.followSystem &&
						props.followSystem[props.userId] &&
						props.followSystem[props.userId][modalType]
					) ? (
						<div>Loading ...</div>
					) : (
						<ul className="follow-list">
							{props.followSystem[props.userId][modalType].map(follower => {
								return modalType === 'followers' ? (
									<li key={follower.follower.id}>
										<NavLink to={`/user-page/${follower.follower.id}`}>
											<Image
												src={follower.follower.avatar}
												className="follower-avatar"
												defaultSrc={config.DEFAULT_AVATAR}
												alt="follower"
											/>
											<div className="follower-name">
												{follower.follower.name}
											</div>
										</NavLink>
									</li>
								) : (
									<li key={follower.user.id}>
										<NavLink to={`/user-page/${follower.user.id}`}>
											<Image
												src={follower.user.avatar}
												className="follower-avatar"
												defaultSrc={config.DEFAULT_AVATAR}
												alt="follower"
											/>
											<div className="follower-name">{follower.user.name}</div>
										</NavLink>
									</li>
								);
							})}
						</ul>
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
