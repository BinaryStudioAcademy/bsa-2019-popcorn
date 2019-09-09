import React from 'react';
import './StaffItem.scss';
import config from '../../../config';
import { StaffItemInfo } from '../StaffList/StaffType';

type StaffItemProps = {
	staffItemInfo: StaffItemInfo;
};

const StaffItem = ({
	staffItemInfo: { name, profile_path, job }
}: StaffItemProps) => {
	return (
		<div className="staff-item">
			<div className={'staff-item-image-wrp'}>
				<img
					className="staff-item-image"
					src={
						profile_path
							? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${profile_path}`
							: config.DEFAULT_AVATAR
					}
				/>
			</div>
			<div className="staff-item-name">{name}</div>
			<div className="staff-item-role">{job}</div>
		</div>
	);
};

export default StaffItem;
