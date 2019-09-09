import React from 'react';
import './StaffItem.scss';
import config from '../../../config';
import { StaffItemInfo } from '../StaffList/StaffType';
import Image from '../../shared/Image/Image';

type StaffItemProps = {
	staffItemInfo: StaffItemInfo;
};

const StaffItem = ({
	staffItemInfo: { name, profile_path, job }
}: StaffItemProps) => {
	return (
		<div className="staff-item">
			<div className={'staff-item-image-wrp'}>
				<Image
					src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${profile_path}`}
					defaultSrc={config.DEFAULT_CREW_CAST_IMAGE}
					className="staff-item-image"
					alt="staff photo"
				/>
			</div>
			<div className="staff-item-name">{name}</div>
			<div className="staff-item-role">{job}</div>
		</div>
	);
};

export default StaffItem;
