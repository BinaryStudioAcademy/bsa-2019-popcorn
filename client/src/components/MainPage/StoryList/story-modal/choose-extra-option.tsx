import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleLeft,
	faPlus,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../../UserPage/UserSurveys/UserSurveys.redux/actions';
import { fetchTops } from '../../../TopListPage/TopListPage.redux/actions';
import { getAllEvents } from '../../../UserPage/UserEvents/actions';
import Spinner from '../../../shared/Spinner/index';

interface IProps {
	match: {
		params: {
			option: string;
		};
	};
	changeActivity: (
		type: string,
		activity: null | { id: string; name: string }
	) => any;
	option: null | { id: string; name: string; any };
	history: {
		push: (path: string) => void;
	};
	currentUserId: string;
	survey: any;
	top: any;
	event: any;
	fetchSurveys: (id: string) => any;
	fetchTops: (id: string) => any;
	getAllEvents: (id: string) => any;
}

interface IState {
	open: boolean;
	back: boolean;
	create: boolean;
	option: boolean;
}

class ChooseExtraOption extends React.Component<IProps, IState> {
	state = {
		open: true,
		back: true,
		create: true,
		option: true
	};

	componentDidMount() {
		const option = this.props.match && this.props.match.params.option;
		if (option === 'survey') {
			this.props.fetchSurveys(this.props.currentUserId);
		}
		if (option === 'top') {
			this.props.fetchTops(this.props.currentUserId);
		}
		if (option === 'event') {
			this.props.getAllEvents(this.props.currentUserId);
		}
	}

	render() {
		const option = this.props.match && this.props.match.params.option;

		const options = this.props[option];

		if (!this.state.open) {
			return <Redirect to={'/'} />;
		}
		if (!this.state.back || !option) {
			return <Redirect to={'/create/extra'} />;
		}
		if (!this.state.create) {
			return (
				<Redirect
					to={{
						pathname: `/user-page/${option}s`,
						state: { url_callback: `/create/extra/${option}` }
					}}
				/>
			);
		}

		const close = () => this.setState({ open: false });
		const back = () => this.setState({ back: false });
		const create = () => this.setState({ create: false });
		const choose = activity => {
			const { name } = activity;
			this.props.history.push('/create');
			activity.name = name || activity.title;
			this.props.changeActivity(option, activity);
		};

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
							{options ?
								options.map(item => (
									<span
										className="recent-created-item"
										key={item.id}
										onClick={() => {
											choose(item);
										}}
									>
										{item.title}
									</span>
								)) : <Spinner />
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = rootState => ({
	survey: rootState.survey.surveys,
	top: rootState.topList.tops,
	currentUserId: rootState.profile.profileInfo.id,
	event: rootState.events.allEvents
});

const mapDispatchToProps = {
	fetchSurveys,
	fetchTops,
	getAllEvents
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChooseExtraOption);
