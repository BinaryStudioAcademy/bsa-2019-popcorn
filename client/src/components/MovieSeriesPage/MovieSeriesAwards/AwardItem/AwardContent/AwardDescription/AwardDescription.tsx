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
		return nominationWinner.map(winner => winner.name).join(', ');
	};

	return (
		<div className="description-wrapper">
			<div
				className="nominationName"
				dangerouslySetInnerHTML={{ __html: nominationName }}
			/>
			<div className="nomination-winner-name">{generateWinnerNames()}</div>
		</div>
	);
};

export default AwardDescription;
