import React from 'react';
import './AwardDescription.scss';
interface IAwardDescription {
	nominationName: string;
	nominationWinner: Array<{ name: string }>;
}

const AwardDescription: React.FC<IAwardDescription> = ({
	nominationName,
	nominationWinner
}) => {
	const generateWinnerNames = () => {
		let namesStr = '';
		nominationWinner.map((el, index) => {
			if (index === nominationWinner.length - 1) {
				namesStr = namesStr + el.name;
			} else namesStr = namesStr + el.name + ', ';
		});
		console.log(namesStr);
		return namesStr;
	};
	return (
		<div className="description-wrapper">
			<div className="nominationName">{`${nominationName}`}</div>
			<div className="hyphen">{nominationWinner.length !== 0 ? '—' : ''}</div>
			<div className="nomination-winner-name">{generateWinnerNames()}</div>
		</div>
	);
};

export default AwardDescription;
