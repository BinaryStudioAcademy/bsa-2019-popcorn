import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleLeft,
	faPlus,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router';

interface IProps {
	match: {
		params: {
			option: string;
		};
	};
	top: [{ id: string; name: string; any }];
	survey: [{ id: string; name: string; any }];
	changeActivity: (type: string, activity: { id: string; name: string }) => any;
	option: null | { id: string; name: string; any };
}

interface IState {
	open: boolean;
	back: boolean;
	create: boolean;
}

class ChooseExtraOption extends React.Component<IProps, IState> {
	state = {
		open: true,
		back: true,
		create: true
	};

	render() {
		const option = this.props.match && this.props.match.params.option;

		const options: Array<{ id: string; name: string; any }> = this.props[
			option
		];

		if (!this.state.open) return <Redirect to={'/'} />;
		if (!this.state.back || !option) return <Redirect to={'/create/extra'} />;
		if (!this.state.create)
			return (
				<Redirect
					to={{
						pathname: `/user-page/${option}s`,
						state: { url_callback: `/create/extra/${option}` }
					}}
				/>
			);
		if (this.props.option) {
			return <Redirect to={'/create'} />;
		}

		const close = () => this.setState({ open: false });
		const back = () => this.setState({ back: false });
		const create = () => this.setState({ create: false });
		const choose = (activity: { id: string; name: string; any }) => {
			this.props.changeActivity(option, activity);
		};

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
				<div className={'choose-extra-option-wrp'}>
					<div className={'create'} onClick={create}>
						<span>
							<FontAwesomeIcon
								icon={faPlus}
								style={{ marginRight: '2px', fontSize: '.8em' }}
							/>
							Create {option}
						</span>
					</div>

					<div className={'recent-created'}>
						{options &&
							options.map(item => (
								<span
									key={item.id}
									onClick={() => {
										choose(item);
									}}
								>
									{item.name}
								</span>
							))}
					</div>
				</div>
			</div>
		);
	}
}

export default ChooseExtraOption;
