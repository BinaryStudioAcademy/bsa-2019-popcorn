import React from 'react';
import { Redirect } from 'react-router';
import PostStoryEditor from '../../PostStoryEditor/PostStoryEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleLeft,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

class ChooseExtra extends React.Component {
	state = {
		open: true,
		back: true
	};

	render() {
		if (!this.state.open) return <Redirect to={'/'} />;
		if (!this.state.back) return <Redirect to={'/create'} />;

		const close = () => this.setState({ open: false });
		const back = () => this.setState({ back: false });

		return (
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
			</div>
		);
	}
}

export default ChooseExtra;
