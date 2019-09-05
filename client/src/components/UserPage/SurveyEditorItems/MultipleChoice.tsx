import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { isEqual } from 'lodash';
import './SurveyItem.scss';

interface IQuestion {
	id: string;
	survey_id: string;
	title: string;
	firstLabel?: string;
	lastLabel?: string;
	type: string;
	image_link?: string;
	required: boolean;
	options?: Array<{
		index: number;
		id: string;
		question_id: string;
		value: string;
	}>;
}

interface IProps {
	questionInfo: IQuestion;
	changeQuestion: (IQuestion) => void;
}

class MultipleChoice extends Component<IProps, IQuestion> {
	constructor(props: IProps) {
		super(props);
		this.state = { ...props.questionInfo };
	}

	componentWillReceiveProps(nextProps) {
		if (!isEqual(nextProps.questionInfo, this.state)) {
			this.setState({ ...nextProps.questionInfo });
		}
	}

	getNewIndex = () => {
		if (!this.state.options) return 0;
		const { index } = this.state.options.reduce((prev, current) =>
			prev.index > current.index ? prev : current
		);
		return index + 1;
	};

	addOption = () => {
		const options = this.state.options;
		if (!options) return;
		const value = options.length + 1;
		const newOption = {
			id: uuid(),
			index: this.getNewIndex(),
			question_id: this.state.id,
			value: `Option ${value}`
		};

		options.push(newOption);

		this.props.changeQuestion({ ...this.state, options });
		this.setState({ ...this.state, options });
	};

	deleteOption = i => {
		if (!this.state.options) return;
		const options = this.state.options;
		options.splice(i, 1);
		this.props.changeQuestion({ ...this.state, options });
	};

	changeInput = (event, id) => {
		let { options } = this.state;
		if (!options) {
			return;
		}
		const value = event.target.value;

		options = options.map((option, i) => {
			if (id === option.id) {
				option.value = value;
			}
			return option;
		});

		this.props.changeQuestion({ ...this.state, options });
	};

	render() {
		const { options, type } = this.state;

		return (
			<div className={`${type.slice(0, 5)} question-body`}>
				{options !== undefined &&
					options.map((option, i) => (
						<div key={i} className="option-container">
							<p className="option-icon"></p>
							<TextareaAutosize
								onChange={event => {
									this.changeInput(event, option.id);
								}}
								value={option.value}
								className="option"
								placeholder="Option*"
								maxLength={255}
							/>
							{options.length !== 1 && (
								<span
									onClick={() => {
										this.deleteOption(i);
									}}
								>
									<FontAwesomeIcon icon={faTimes} />
								</span>
							)}
						</div>
					))}
				<div className="option-container">
					<p className="option-icon"></p>
					<p className="add-bttn" onClick={this.addOption}>
						Add option
					</p>
				</div>
			</div>
		);
	}
}

export default MultipleChoice;
