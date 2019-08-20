import React from 'react';
import { Redirect } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleLeft,
	faChevronRight,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const options = ['survey', 'top', 'vote', 'movie'];

class ChooseExtra extends React.Component {
	state = {
		open: true,
		back: true,
		option: ''
	};

	render() {
		if (!this.state.open) return <Redirect to={'/'} />;
		if (!this.state.back) return <Redirect to={'/create'} />;
		if (this.state.option)
			return <Redirect to={'/create/extra/' + this.state.option} />;

		const close = () => this.setState({ open: false });
		const back = () => this.setState({ back: false });
		const setOption = option => this.setState({ option });

		return (
			<div className={'modal-wrp'}>
				<div className={'modal modal-story'}>
					<div className={'nav-block-wrp'}>
						<span onClick={back}>
							<FontAwesomeIcon
								icon={faArrowCircleLeft}
								className={'fontAwesomeIcon'}
							/>
						</span>
						<span onClick={close}>
							<FontAwesomeIcon
								icon={faTimesCircle}
								className={'fontAwesomeIcon'}
							/>
						</span>
					</div>
					<div className={'content-extra'}>
						<div className="extra-header">Choose Extra</div>
						<div>
							{options &&
								options.map(option => {
									return (
										<div
											className={'extra-item'}
											onClick={() => setOption(option)}
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
				</div>
			</div>
		);
	}
}

export default ChooseExtra;
