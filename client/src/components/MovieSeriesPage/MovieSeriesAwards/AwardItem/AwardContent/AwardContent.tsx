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
		<div style={{ marginLeft: '15px' }}>
			<AwardTitle title={title} />
			<div className="award-subtitle">{subtitle}</div>
			{nominations.categories.map(el => (
				<AwardDescription
					nominationName={el.category}
					nominationWinner={el.names}
				/>
			))}
		</div>
	);
};

export default AwardContent;
