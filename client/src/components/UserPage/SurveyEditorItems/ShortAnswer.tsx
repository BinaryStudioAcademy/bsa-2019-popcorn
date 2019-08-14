import React from 'react';
import './SurveyItem.scss';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const ShortAnswer: React.FC = () => {
	return (
		<div className="question-body">
			<TextareaAutosize
				className="short-answer"
				disabled
				placeholder="Short answer"
				maxLength={255}
			/>
		</div>
	);
};

export default ShortAnswer;
