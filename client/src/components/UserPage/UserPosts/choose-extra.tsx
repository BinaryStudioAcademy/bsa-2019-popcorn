import React from 'react';
import { Redirect } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChooseExtraOption from './choose-extra-option';
import {
	faArrowCircleLeft,
	faChevronRight,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const options = ['survey', 'top', 'vote', 'event'];

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
				{this.state.modalOption ? (
					<ChooseExtraOption
						setExtra={this.props.setExtra}
						toggleModalOption={this.toggleModalOption}
						option={this.state.option}
					/>
				) : (
					<div className={'modal modal-story'}>
						<div className={'nav-block-wrp'}>
							<span onClick={() => toggleModal()}>
								<FontAwesomeIcon
									icon={faArrowCircleLeft}
									className={'fontAwesomeIcon'}
								/>
							</span>
							<span onClick={() => toggleModal()}>
								<FontAwesomeIcon
									icon={faTimesCircle}
									className={'fontAwesomeIcon'}
								/>
							</span>
						</div>
						<div className={'content-extra'}>
							{options &&
								options.map((option, i) => {
									return (
										<div
											key={i}
											className={'extra-item'}
											onClick={() => this.toggleModalOption(option)}
										>
											<span>Add {option}</span>
											<FontAwesomeIcon
												icon={faChevronRight}
												style={{ color: '#ffab07' }}
											/>
										</div>
									);
								})}
						</div>
					</div>
				)}
			</>
		);
	}
}

export default ChooseExtra;
