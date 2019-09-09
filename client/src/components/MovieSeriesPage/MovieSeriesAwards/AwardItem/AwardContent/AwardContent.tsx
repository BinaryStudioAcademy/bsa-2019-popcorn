import React from 'react';
import AwardDescription from './AwardDescription/AwardDescription';
import AwardTitle from './AwardTitle/AwardTitle';
import './AwardContent.scss';

interface IAwardContent {
	title: string;
	subtitle: string;
	nominations: any;
}
const AwardContent: React.FC<IAwardContent> = ({
	title,
	nominations,
	subtitle
}) => {
	return (
		<div className="award-content">
			<AwardTitle title={title} />
			<div className="award-subtitle">{subtitle}</div>
			{nominations.categories.map((el, index) => (
				<AwardDescription
					key={index}
					nominationName={el.category}
					nominationWinner={el.names}
				/>
			))}
		</div>
	);
};

export default AwardContent;
