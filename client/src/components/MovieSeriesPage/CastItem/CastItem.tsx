import React from 'react';
import './CastItem.scss';
import config from '../../../config';
import { CastItemInfo } from '../CastList/CastType';
import Image from '../../shared/Image/Image';

type CastItemProps = {
	castItemInfo: CastItemInfo;
};

const CastItem = ({
	castItemInfo: { profile_path, name, character }
}: CastItemProps) => {
	return (
		<div className="cast-item">
			<div className="cast-item-image-wrp">
				<Image
					src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${profile_path}`}
					defaultSrc={config.DEFAULT_CREW_CAST_IMAGE}
					alt="cast photo"
					className="cast-item-image"
				/>
			</div>
			<div className="cast-item-name">{name}</div>
			<div className="cast-item-role">{character}</div>
		</div>
	);
};

export default CastItem;
