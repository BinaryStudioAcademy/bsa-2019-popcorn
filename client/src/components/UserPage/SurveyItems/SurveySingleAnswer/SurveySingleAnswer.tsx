import React from 'react';
import './SurveySingleAnswer.scss';

interface IAnswer {
	questionId: string;
	optionId: string;
}

interface IReadyAnswer {
	id: string;
	question_id: string;
	option_id?: string;
	user_id: string;
	value: string;
}

interface IProps {
	questionInfo: {
		id: string;
		survey_id: string;
		title: string;
		firstLabel?: string;
		lastLabel?: string;
		type: string;
		image_link?: string;
		required: boolean;
		options?: Array<{
			id: string;
			question_id: string;
			value: string;
		}>;
	};
	setAnswer?: (data: IAnswer) => void;
	disable?: boolean;
	answer?: IReadyAnswer;
}

const SurveySingleAnswer = (props: IProps) => {
	const { questionInfo, disable, answer } = props;
	const { id, title, options, required, image_link } = questionInfo;

	return (
		<div className="question-container single">
			<p className={`survey-question required-${required}`}>{title}</p>
			{image_link && <img className="question-image" alt="" src={image_link} />}
			{options !== undefined &&
				options.map((option, i) => (
					<p key={i}>
						<label>
							<input
								type="radio"
								name={id}
								key={i}
								value={option.value}
								disabled={disable || false}
								checked={answer && answer.option_id === option.id}
							/>
							<span className="checkmark"></span>
							{option.value}
						</label>
					</p>
				))}
		</div>
	);
};

export default SurveySingleAnswer;
