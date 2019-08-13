import React from 'react';
import './SurveyItem.scss';

const ShortAnswer: React.FC = () => {
	return (
		<div className="question-body">
			<input
				className="short-answer"
				disabled
				placeholder="Short answer"
				type="text"
			/>
		</div>
	);
};

export default ShortAnswer;
