import React from 'react';
import Moment from 'react-moment';
import Image from '../../shared/Image/Image';
import config from '../../../config';
import { ITop } from '../TopPage.service';

import './TopPageTop.scss';

interface ITopProps {
	top: ITop;
}

const TopPageTop: React.SFC<ITopProps> = ({ top }) => {
	return (
		<div className="top">
			<div className="top-poster-wrp">
				<Image
					src={top.topImageUrl}
					defaultSrc={config.DEFAULT_MOVIE_IMAGE}
					alt="top-image"
					className="top-poster"
				/>
			</div>
			<div className="top-info">
				<span className="top-title">{top.title}</span>
				<div className="top-author">
					<Image
						src={top.user.avatar}
						defaultSrc={config.DEFAULT_AVATAR}
						alt="user-avatar"
						className="top-user-avatar"
					/>
					<span className="top-author-name">{top.user.name}</span>
				</div>
				<span className="top-created-at">
					<Moment format=" D MMM YYYY " local>
						{String(top.created_at)}
					</Moment>
				</span>
			</div>
		</div>
	);
};

export default TopPageTop;
