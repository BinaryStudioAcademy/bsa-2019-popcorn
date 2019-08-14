import React from 'react';
import './SurveyLinearScale.scss';

interface IReadyAnswer {
	id: string;
	question_id: string;
	option_id?: string;
	user_id: string;
	value: string;
}

interface IAnswer {
	questionId: string;
	optionId: string;
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

const SurveyLinearScale = (props: IProps) => {
	const { questionInfo, disable, answer } = props;
	const {
		id,
		title,
		options,
		lastLabel,
		firstLabel,
		required,
		image_link
	} = questionInfo;

	return (
		<div className="question-container">
			<p className={`survey-question required-${required}`}>{title}</p>
			{image_link && <img className="question-image" alt="" src={image_link} />}
			<div className="linear-scale">
				<span className="label">{firstLabel}</span>
				{options !== undefined &&
					options.map((option, i) => (
						<p key={i} className="linear-scale-item">
							<label>
								{option.value}
								<input
									type="radio"
									name={id}
									key={i}
									value={option.value}
									disabled={disable || false}
									checked={answer && answer.option_id === option.id}
									onChange={() => {
										if (!props.setAnswer) return;
										props.setAnswer({
											questionId: id,
											optionId: option.id
										});
									}}
								/>
								<span className="checkmark"></span>
							</label>
						</p>
					))}
				<span className="label">{lastLabel}</span>
			</div>
		</div>
	);
};

export default SurveyLinearScale;
