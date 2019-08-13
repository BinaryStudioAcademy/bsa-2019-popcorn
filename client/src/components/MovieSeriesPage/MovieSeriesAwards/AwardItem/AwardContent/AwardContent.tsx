import React from 'react';
import AwardDescription from './AwardDescription/AwardDescription';
import AwardTitle from './AwardTitle/AwardTitle';
interface IAwardContent {
	isWinner: boolean;
	title: string;
	year: number;
	nominationName: string;
	gender: string;
	winnerName?: string;
}
const AwardContent: React.FC<IAwardContent> = ({
	isWinner,
	title,
	year,
	nominationName,
	gender,
	winnerName
}) => {
	return (
		<div>
			<AwardTitle title={title} year={year} />
			<AwardDescription
				isWinner={isWinner}
				nominationName={nominationName}
				gender={gender}
				winnerName={winnerName}
			/>
		</div>
	);
};

export default AwardContent;
