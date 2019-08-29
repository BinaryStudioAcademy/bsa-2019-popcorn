import React from 'react';
import './AwardTitle.scss';
interface IAwardTitle {
	title: string;
}
const AwardTitle: React.FC<IAwardTitle> = ({ title }) => {
	return (
		<div>
			<div className="award-title">{title}</div>
		</div>
	);
};

export default AwardTitle;
