import React from 'react';
import './CastItem.scss';
import config from '../../../config';
import { CastItemInfo } from '../CastList/CastType';

type CastItemProps = {
	castItemInfo: CastItemInfo;
};

const CastItem = ({
	castItemInfo: { profile_path, name, character }
}: CastItemProps) => {
	return (
		<div className="cast-item">
			<div className="cast-item-image-wrp">
				<img
					className="cast-item-image"
					src={
						profile_path
							? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${profile_path}`
							: config.DEFAULT_AVATAR
					}
				></img>
			</div>
			<div className="cast-item-name">{name}</div>
			<div className="cast-item-role">{character}</div>
		</div>
	);
};

export default CastItem;
