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

type ProfileProps = {
	profileInfo: {
		id: string;
		name: string;
		male: boolean;
		female: boolean;
		location: string;
		aboutMe: string;
		avatar: string;
	};
	uploadAvatar?: (FormData, string) => any;
	uploadUrl?: string;
	cancelAvatar?: () => any;
	setAvatar?: (url: string, id: string) => any;
};
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

// const path = "M 56 21.900391 C 43.3 21.900391 33 32.200391 33 44.900391 C 33 46.600391 34.3 47.900391 36 47.900391 L 41.199219 47.900391 L 41.400391 47.900391 C 52.900391 47.900391 64.6 47.900391 73 40.400391 L 73 40.5 C 73.4 40.1 73.799609 39.800391 74.099609 39.400391 C 75.199609 38.200391 77.100781 37.999609 78.300781 39.099609 C 79.600781 40.199609 79.7 42.2 78.5 43.5 L 77.099609 44.900391 C 75.799609 46.200391 76.3 48.399609 78 49.099609 C 79 49.499609 80.099219 49.700781 81.199219 49.800781 C 82.699219 50.000781 83.900391 51.200781 83.900391 52.800781 L 83.900391 59.599609 C 84.000391 70.099609 76.000391 79.2 65.400391 80 C 53.800391 80.8 44.1 71.599609 44 60.099609 C 44 58.499609 42.799219 57.1 41.199219 57 C 39.499219 56.9 38 58.3 38 60 C 38 74.3 49.7 86 64 86 C 77.9 86 89.3 75.100781 90 61.300781 L 90 61 L 90 47 L 90 44 L 90 43 C 90 35.8 84.599609 29.899609 77.599609 29.099609 L 77.199219 28.5 C 74.299219 24.4 69.5 21.900391 64.5 21.900391 L 56 21.900391 z M 64 91 C 47.6 91 32.400781 99.899609 24.300781 114.09961 C 23.500781 115.49961 24.000391 117.39922 25.400391 118.19922 C 25.900391 118.49922 26.400391 118.59961 26.900391 118.59961 C 27.900391 118.59961 29 118.09961 29.5 117.09961 C 36.6 104.69961 49.8 97 64 97 C 78.2 97 91.4 104.69961 98.5 117.09961 C 99.3 118.49961 101.19961 118.99922 102.59961 118.19922 C 103.99961 117.39922 104.49922 115.49961 103.69922 114.09961 C 95.599219 99.899609 80.4 91 64 91 z"
// const UserLogo = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
//          width="64" height="64"
//          viewBox="0 0 128 128">
//         <path
//             d= {path} >
//         </path>
//     </svg>
// );

class ProfileComponent extends Component<ProfileProps> {
	constructor(props: ProfileProps) {
		super(props);
	}

	handleUploadFile(e) {
		const data = new FormData();
		data.append('file', e.target.files[0]);
		if (this.props.uploadAvatar)
			this.props.uploadAvatar(data, this.props.profileInfo.id);
		else console.log('no uploadAvatar method');
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

		const { uploadUrl, cancelAvatar, setAvatar } = this.props;
		return (
			<div className={'UserProfileComponent'}>
				<div className={'ProfileWrap'}>
					{uploadUrl ? (
						<div className={'profilePhotoWrap'}>
							<img
								src={uploadUrl}
								style={{ width: '100%', height: '100%' }}
								alt=""
							/>
							<span
								onClick={() => {
									if (setAvatar) setAvatar(uploadUrl, id);
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

export default ProfileComponent;
