import React, { Component } from 'react';
import './ProfileComponent.scss';
import {
	faCamera,
	faCheckCircle,
	faTimesCircle,
	faVenus,
	faMars,
	faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../../../config';
import ISelectedProfileInfo from '../SelectedProfileInterface';
import Cropper from 'react-cropper';
import { connect } from 'react-redux';
import Follow from './FollowSystem/Follow';

type ProfileProps = {
	profileInfo: ISelectedProfileInfo;
	uploadAvatar?: (FormData, string) => any;
	uploadUrl?: string;
	cancelAvatar?: () => any;
	setAvatar?: (url: string, id: string) => any;
	croppedSaved: boolean;
	saveCropped: () => void;
	userId: string;
	userRole: string;
};
interface IProfileComponentState {
	errorMsg?: string;
}
const favMovies: Array<{ id: string; movie: string }> = [
	{
		id: Math.random() * (9000 - 1) + 1 + '',
		movie: 'Cloud Atlas'
	},
	{
		id: Math.random() * (9000 - 1) + 1 + '',
		movie: 'V for Vendetta '
	},
	{
		id: Math.random() * (9000 - 1) + 1 + '',
		movie: 'Donnie Darko '
	},
	{
		id: Math.random() * (9000 - 1) + 1 + '',
		movie: 'The Talented Mr. Ripley '
	}
];
const favShows: Array<{ id: string; movie: string }> = [
	{
		id: Math.random() * (9000 - 1) + 1 + '',
		movie: 'Stranger Things '
	},
	{
		id: Math.random() * (9000 - 1) + 1 + '',
		movie: 'Breaking Bad'
	},
	{
		id: Math.random() * (9000 - 1) + 1 + '',
		movie: 'Black Mirror'
	}
];

class ProfileComponent extends Component<ProfileProps, IProfileComponentState> {
	constructor(props: ProfileProps) {
		super(props);
		this.state = {
			errorMsg: ''
		};
	}
	private cropper = React.createRef<Cropper>();

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
			const dataUrl = this.cropper.current.getCroppedCanvas().toBlob(blob => {
				const data = new FormData();
				data.append('file', blob);
				if (this.props.uploadAvatar)
					this.props.uploadAvatar(data, this.props.profileInfo.id);
				else console.log('no uploadAvatar method');
			});
		}
		this.props.saveCropped();
	}

	isOwnProfile() {
		const {
			userId,
			userRole,
			profileInfo: { id: ownerId }
		} = this.props;
		return userRole === 'admin' || userId === ownerId;
	}
	render() {
		let {
			name,
			location,
			aboutMe,
			male,
			female,
			avatar,
			id
		} = this.props.profileInfo;
		if (!male && !female) {
			female = true;
		}

		if (!location) {
			location = 'Kyiv';
		}
		const { uploadUrl, cancelAvatar, setAvatar, croppedSaved } = this.props;
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
									className="fontAwesomeIcon"
								/>
							</span>
							<span
								onClick={() => {
									if (cancelAvatar) cancelAvatar();
								}}
							>
								<FontAwesomeIcon
									icon={faTimesCircle}
									className={'fontAwesomeIcon'}
								/>
							</span>
						</div>
					) : (
						<div className={'profilePhotoWrap'}>
							<img
								src={avatar || config.DEFAULT_AVATAR}
								style={{ width: '100%', height: '100%' }}
								alt=""
							/>
							{this.isOwnProfile() && (
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
							<Follow userId={id} />
						</div>
					)}

					<div className="ProfileInfo">
						<div className="profileRow-username">{name}</div>
						<div className="profileRow-info">
							{male && (
								<div className="user-gender">
									<FontAwesomeIcon icon={faMars} className="fontAwesomeIcon" />
									Male
								</div>
							)}
							{female && (
								<div className="user-gender">
									<FontAwesomeIcon icon={faVenus} className="fontAwesomeIcon" />
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
								{favMovies.length > 0
									? favMovies.map(movie => <p key={movie.id}>{movie.movie}</p>)
									: '-'}
							</div>
						</div>
						<div className="profileRow">
							<p className="field">Favorite TV-shows: </p>
							<div className="content">
								{favShows.length > 0
									? favShows.map(movie => <p key={movie.id}>{movie.movie}</p>)
									: '-'}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id,
	userRole: rootState.profile.profileInfo.role
});
export default connect(mapStateToProps)(ProfileComponent);
