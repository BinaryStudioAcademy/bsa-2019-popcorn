import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../../shared/Spinner/index';
import { getUserEvents } from './actions';
import EventItem from './EventItem/EventItem';
import './UserEvents.scss';

interface IProps {
	userEvents: IEvent[];
	getUserEvents: (id: string) => any;
	currentUserId: string;
}

export interface IEvent {
	id: string;
	title: string;
	description: string;
	location: {
		lat: number;
		lng: number;
	};
	dateRange: {
		startDate: string;
		endDate: string;
	};
	userId: string;
	image: string;
	isPrivate: boolean;
	movieId: string | undefined;
	eventVisitors: IVisitor[];
}

interface IVisitor {
	id: string;
	status: string;
	userId: string;
	eventId: string;
}

class UserEvents extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
	}

	componentDidMount() {
		const { currentUserId } = this.props;
		this.props.getUserEvents(currentUserId);
	}

	renderEventList = (eventList: IEvent[]) =>
		eventList.map(event => <EventItem event={event} />);

	render() {
		const { userEvents, currentUserId } = this.props;

		if (!userEvents) {
			return <Spinner />;
		}

		const ownEvents: IEvent[] = [];
		const subscribeEvents: IEvent[] = [];

		for (const event of userEvents) {
			event.userId === currentUserId
				? ownEvents.push(event)
				: subscribeEvents.push(event);
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
