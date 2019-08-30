import React from 'react';
import { Redirect } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChooseExtraOption from './choose-extra-option';
import {
	faArrowCircleLeft,
	faChevronRight,
	faTimesCircle,
	faTasks,
	faTrophy,
	faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

const options = [
	{
		title: 'survey',
		icon: faTasks
	},
	{
		title: 'top',
		icon: faTrophy
	},
	{
		title: 'event',
		icon: faCalendarAlt
	}
];

interface IPropsExtra {
	toggleModal: () => any;
	setExtra: (data: any) => any;
}

interface IStateExtra {
	modalOption: boolean;
	option: string;
}

class ChooseExtra extends React.Component<IPropsExtra, IStateExtra> {
	constructor(props: IPropsExtra) {
		super(props);
		this.state = {
			modalOption: false,
			option: ''
		};
		this.toggleModalOption = this.toggleModalOption.bind(this);
	}

	toggleModalOption(data) {
		this.setState({
			modalOption: !this.state.modalOption,
			option: data
		});
	}

	render() {
		const { toggleModal } = this.props;

		return (
			<>
				{this.state.modalOption && (
					<ChooseExtraOption
						setExtra={this.props.setExtra}
						toggleModalOption={this.toggleModalOption}
						option={this.state.option}
					/>
				)}
				<div className={'extra-buttons'}>
					{options &&
						options.map((option, i) => {
							return (
								<div
									key={i}
									className={'extra-item'}
									onClick={() => this.toggleModalOption(option.title)}
								>
									<FontAwesomeIcon className="extra-icon" icon={option.icon} />
									<span className={'extra-title'}>
										{option.title.charAt(0).toUpperCase() +
											option.title.slice(1)}
									</span>
								</div>
							);
						})}
				</div>
			</>
		);
	}
}

export default ChooseExtra;
