import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../../shared/Spinner/index';
import { getUserEvents } from './actions';
import {
	IEventFormatDataBase,
	IEventFormatClient,
	formatToClient
} from './UserEvents.service';
import EventItem from './EventItem/EventItem';
import './UserEvents.scss';

interface IProps {
	userEvents: IEventVisitor[];
	getUserEvents: (id: string) => any;
	currentUserId: string;
}

interface IEventVisitor {
	eventId: string;
	id: string;
	status: string;
	event: IEventFormatDataBase;
}

class UserEvents extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
	}

	componentDidMount() {
		const { currentUserId } = this.props;
		this.props.getUserEvents(currentUserId);
	}

	renderEventList = (eventList: IEventFormatClient[]) =>
		eventList.map(event => <EventItem event={event} />);

	render() {
		const { userEvents, currentUserId } = this.props;

		if (!userEvents) {
			return <Spinner />;
		}

		const ownEvents: IEventFormatClient[] = [];
		const subscribeEvents: IEventFormatClient[] = [];

		for (const eventVisitor of userEvents) {
			eventVisitor.eventId === currentUserId
				? ownEvents.push(formatToClient(eventVisitor.event))
				: subscribeEvents.push(formatToClient(eventVisitor.event));
		}
		return (
			<div className="UserEvents">
				<div className="events-title">
					<span>Your Events</span>
				</div>
				<div className="event-list-container">
					{ownEvents.length === 0 ? (
						<div className="event-show-warning">
							No one event. You can craete
						</div>
					) : (
						this.renderEventList(ownEvents)
					)}
				</div>
				<div className="events-title">
					<span>Events interested you</span>
				</div>
				<div className="event-list-container">
					{subscribeEvents.length === 0 ? (
						<div className="event-show-warning">No one event</div>
					) : (
						this.renderEventList(subscribeEvents)
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		...props,
		currentUserId: state.profile.profileInfo.id,
		userEvents: state.events.userEvents
	};
};

const mapDispatchToProps = dispatch => {
	const actions = {
		getUserEvents
	};

	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserEvents);
