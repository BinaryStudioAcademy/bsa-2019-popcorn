import React from 'react';
import { Redirect } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleLeft,
	faChevronRight,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const options = ['top'];

interface IPropsExtra {
	addExtra: () => any;
	setExtra: (data: any) => any;
}

class ChooseExtra extends React.Component<IPropsExtra> {
	constructor(props: IPropsExtra) {
		super(props);
		this.state = {
			option: ''
		};
	}

	render() {
		const { addExtra } = this.props;

		return (
			<div className={'modal modal-story'}>
				<div className={'nav-block-wrp'}>
					<span onClick={() => addExtra()}>
						<FontAwesomeIcon
							icon={faArrowCircleLeft}
							className={'fontAwesomeIcon'}
						/>
					</span>
					<span onClick={() => addExtra()}>
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
									onClick={() => this.props.setExtra(option)}
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
		);
	}
}

export default ChooseExtra;
