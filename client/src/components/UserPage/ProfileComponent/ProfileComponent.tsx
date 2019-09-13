import React, { Component } from 'react';
import './ProfileComponent.scss';
import {
	faCamera,
	faCheckCircle,
	faTimesCircle,
	faVenus,
	faMars,
	faMapMarkerAlt,
	faEdit
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../../../config';
import ISelectedProfileInfo from '../SelectedProfileInterface';
import ProfileEditor from './ProfileEditor/ProfileEditor';
import Cropper from 'react-cropper';
import { connect } from 'react-redux';
import Follow from './FollowSystem/Follow';
import FollowButton from './FollowSystem/FollowButton/FollowButton';
import { bindActionCreators } from 'redux';
import { updateProfile } from '../actions';
import { NavLink, Redirect } from 'react-router-dom';
import { createChat } from '../../ChatPage/ChatPage.redux/actions';

type ProfileProps = {
	profileInfo: ISelectedProfileInfo;
	uploadAvatar?: (FormData, string) => any;
	uploadUrl?: string;
	cancelAvatar?: () => any;
	setAvatar?: (url: string, id: string) => any;
	croppedSaved: boolean;
	saveCropped: () => void;
	userId: string;
	isOwnData: boolean;
	updateProfile: (
		id: string,
		data: {
			name: string;
			male: boolean;
			female: boolean;
			aboutMe: string;
			location: string;
		}
	) => any;
	createChat: (user1Id: string, user2Id: string) => void;
	chats: any;
};
interface IProfileComponentState {
	errorMsg?: string;
	isEditing: boolean;
	isRedirectWaiting: boolean;
}

class ProfileComponent extends Component<ProfileProps, IProfileComponentState> {
	constructor(props: ProfileProps) {
		super(props);
		this.state = {
			errorMsg: '',
			isEditing: false,
			isRedirectWaiting: false
		};
	}
	private cropper = React.createRef<Cropper>();

	onEdit = () => {
		this.setState({
			isEditing: true
		});
	};

	onEditCancel = () => {
		this.setState({
			isEditing: false
		});
	};

	onEditSave = data => {
		const newData = { ...data, gender: undefined };
		newData.favoriteMovieIds = newData.favoriteMovies.map(item => item.id);
		newData.favoriteMovies = undefined;
		newData.male = data.gender;
		newData.female = !data.gender;
		this.props.updateProfile(this.props.userId, newData);
		this.setState({
			isEditing: false
		});
	};

	handleUploadFile(e) {
		this.setState({ errorMsg: '' });

		if (
			e.target.files[0].type !== 'image/jpeg' &&
			e.target.files[0].type !== 'image/jpg' &&
			e.target.files[0].type !== 'image/png'
		) {
			e.target.value = '';
			this.setState({
				errorMsg: 'Wrong file format! (only jpeg, png, jpg are allowed)'
			});
			return;
		} else if (e.target.files[0] && e.target.files[0].size > 1048576 * 3) {
			e.target.value = '';
			this.setState({
				errorMsg: 'File is too big! (max 3MB)'
			});
			return;
		}

		const data = new FormData();
		data.append('file', e.target.files[0]);
		if (this.props.uploadAvatar)
			this.props.uploadAvatar(data, this.props.profileInfo.id);
		else console.log('no uploadAvatar method');
	}
	handleSaveCropped() {
		if (this.cropper.current) {
			this.cropper.current.getCroppedCanvas().toBlob(blob => {
				const data = new FormData();
				data.append('file', blob);
				if (this.props.uploadAvatar) {
					this.props.uploadAvatar(data, this.props.profileInfo.id);
				} else {
					console.log('no uploadAvatar method');
				}
			});
		}
		this.props.saveCropped();
	}
	findChat = () => {
		for (const chatId in this.props.chats) {
			if (this.props.chats[chatId].user.id === this.props.profileInfo.id) {
				return this.props.chats[chatId];
			}
		}
	};

	onChatClick = () => {
		this.setState({ isRedirectWaiting: true });
		if (!this.findChat()) {
			this.props.createChat(this.props.userId, this.props.profileInfo.id);
		}
	};

	render() {
		let {
			name,
			location,
			aboutMe,
			male,
			female,
			avatar,
			id,
			favoriteLists
		} = this.props.profileInfo;
		if (!male && !female) {
			female = true;
		}

		if (!location) {
			location = 'Kyiv';
		}

		const { isEditing } = this.state;
		const { uploadUrl, cancelAvatar, setAvatar, isOwnData } = this.props;

		const chat = this.findChat();

		if (this.state.isRedirectWaiting && chat) {
			return <Redirect to={`/chat/${chat.id}`} />;
		}
		return (
			<div className={'UserProfileComponent'}>
				{this.state.errorMsg && (
					<span className="upload-error">{this.state.errorMsg}</span>
				)}
				<div className={'ProfileWrap'}>
					{uploadUrl ? (
						<div className={'profilePhotoWrap'}>
							{this.props.croppedSaved ? (
								<img className="avatar-preview" src={uploadUrl} />
							) : (
								<Cropper
									ref={this.cropper}
									src={uploadUrl}
									style={{ width: '100%', height: '100%' }}
									aspectRatio={3 / 3}
								/>
							)}
							<span
								onClick={() => {
									this.props.croppedSaved && setAvatar
										? setAvatar(uploadUrl, id)
										: this.handleSaveCropped();
								}}
							>
								<FontAwesomeIcon
									icon={faCheckCircle}
									className="cropperSettingsIcon"
								/>
							</span>
							<span
								onClick={() => {
									if (cancelAvatar) cancelAvatar();
								}}
							>
								<FontAwesomeIcon
									icon={faTimesCircle}
									className={'cropperSettingsIcon'}
								/>
							</span>
						</div>
					) : (
						<div className={'profilePhotoWrap'}>
							<img
								className="profile-avatar"
								src={avatar || config.DEFAULT_AVATAR}
								alt=""
							/>
							{isOwnData && (
								<div>
									<input
										name="image"
										type="file"
										onChange={e => this.handleUploadFile(e)}
										className="upload-image"
										id="image"
										accept=".jpg, .jpeg, .png"
										disabled={!!uploadUrl}
										hidden
									/>
									<div className="upload-wrp">
										<label htmlFor="image" className="upload-image-button">
											<FontAwesomeIcon
												icon={faCamera}
												className="fontAwesomeIcon"
											/>
										</label>
									</div>
								</div>
							)}
							<Follow userId={id} className="follow" />
						</div>
					)}

					{!isEditing ? (
						<div className="ProfileInfo">
							{isOwnData && (
								<span onClick={this.onEdit}>
									<FontAwesomeIcon
										icon={faEdit}
										className="fontAwesomeIcon edit-icon"
									/>
								</span>
							)}
							{this.props.userId !== id && (
								<FollowButton className="follow-btn" />
							)}
							{this.props.userId !== id && (
								<button className="chat-btn" onClick={this.onChatClick}>
									Send message
								</button>
							)}
							<div className="profileRow-username">
								<span>{name}</span>
							</div>
							<div className="profileRow-info">
								{male && (
									<div className="user-gender">
										<FontAwesomeIcon
											icon={faMars}
											className="fontAwesomeIcon"
										/>
										Male
									</div>
								)}
								{female && (
									<div className="user-gender">
										<FontAwesomeIcon
											icon={faVenus}
											className="fontAwesomeIcon"
										/>
										Female
									</div>
								)}

								{location && (
									<div className="user-location">
										<FontAwesomeIcon
											icon={faMapMarkerAlt}
											className="fontAwesomeIcon"
										/>
										{location}
									</div>
								)}
							</div>
							<div className="profileRow">
								<p className="field">About: </p>
								<div className="content">{aboutMe || '-'}</div>
							</div>
							<div className="profileRow">
								<p className="field">Favorite movies: </p>
								<div className="content">
									<div className="favourite">
										{favoriteLists.length > 0
											? favoriteLists.map(item => {
													return (
														item.movie && (
															<NavLink
																to={'/movies/' + item.movie.id}
																key={item.movie.id}
															>
																<p>
																	{item.movie.name}
																	<span className="release-date">
																		{item.movie.release_date
																			? ' (' +
																			  item.movie.release_date.slice(0, 4) +
																			  ')'
																			: null}
																	</span>
																</p>
															</NavLink>
														)
													);
											  })
											: '-'}
									</div>
								</div>
							</div>
						</div>
					) : (
						<ProfileEditor
							user={this.props.profileInfo}
							onEditCancel={this.onEditCancel}
							onEditSave={this.onEditSave}
						/>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id,
	chats: rootState.chat.chats
});

const actions = {
	updateProfile,
	createChat
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileComponent);
