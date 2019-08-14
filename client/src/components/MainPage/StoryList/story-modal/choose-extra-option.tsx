import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleLeft,
	faTimesCircle,
	faPlus
} from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router';

interface IProps {
	match: {
		params: {
			option: string;
		};
	};
	top: { id: string; name: string; any };
	survey: { id: string; name: string; any };
}

const mock = [
	{
		name: 'Big Title 1'
	},
	{
		name: 'Title 2'
	},
	{
		name: 'Title 3'
	}
];

class ChooseExtraOption extends React.Component<IProps> {
	state = {
		open: true,
		back: true,
		create: true
	};

	render() {
		const option = this.props.match && this.props.match.params.option;

		console.log(this.props[option]);

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

		const close = () => this.setState({ open: false });
		const back = () => this.setState({ back: false });
		const create = () => this.setState({ create: false });

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
						{mock && mock.map(item => <span>{item.name}</span>)}
					</div>
				</div>
			</div>
		);
	}
}

export default ChooseExtraOption;
