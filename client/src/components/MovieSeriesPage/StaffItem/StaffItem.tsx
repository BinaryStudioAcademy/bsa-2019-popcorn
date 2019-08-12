import React from 'react';
import './StaffItem.scss';

type StaffItemProps = {
	staffItemInfo: {
		names: Array<string>;
		role: string;
	};
};

const StaffItem = ({ staffItemInfo: { names, role } }: StaffItemProps) => {
	return (
		<div className="staff-item">
			<div className="staff-item-role">{role}:</div>
			{names.map((el, index) => {
				if (index == names.length - 1)
					return <div className="staff-item-name">{el}</div>;
				else return <div className="staff-item-name">{el},</div>;
			})}
		</div>
	);
};

export default StaffItem;
