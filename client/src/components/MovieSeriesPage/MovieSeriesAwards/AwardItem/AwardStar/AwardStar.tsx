import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './AwardStar.scss';
interface IAwardStar {
	isWinner: boolean;
}
const AwardStar: React.FC<IAwardStar> = ({ isWinner }) => {
	const star = isWinner ? (
		<FontAwesomeIcon icon={faStar} className="yellowStar" />
	) : (
		<FontAwesomeIcon icon={faStar} className="greyStar" />
	);
	return <div>{star}</div>;
};

export default AwardStar;
