import React from 'react';
import './CastItem.scss';

type CastItemProps = {
	castItemInfo: {
		image: string;
		name: string;
		role: string;
	};
};

const CastItem = ({ castItemInfo: { image, name, role } }: CastItemProps) => {
	return (
		<div className="cast-item">
			<img className="cast-item-image" src={image}></img>
			<div className="cast-item-name">{name}</div>
			<div className="cast-item-role">{role}</div>
		</div>
	);
};

export default CastItem;
