import React from 'react';
import AwardContent from './AwardContent/AwardContent';
import { ReactComponent as AwardIcon } from '../../../../assets/icons/general/movie/awardIcon.svg';
import { ReactComponent as NomineeIcon } from '../../../../assets/icons/general/movie/nomineeIcon.svg';
import './AwardItem.scss';
interface IAwardItem {
	title: string;
	nominations: any;
}
const AwardItem: React.FC<IAwardItem> = ({ title, nominations }) => {
	return (
		<div className="item-wrapper">
			{nominations.titleAwardOutcome.split(' ')[0].toLowerCase() ===
			'winner' ? (
				<AwardIcon className="award-icon" />
			) : (
				<NomineeIcon className="award-icon" />
			)}
			<AwardContent
				title={title}
				subtitle={nominations.titleAwardOutcome}
				nominations={nominations}
			/>
		</div>
	);
};

export default AwardItem;
