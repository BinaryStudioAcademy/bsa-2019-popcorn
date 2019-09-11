import React, { useState, useEffect } from 'react';
import './EventPage.scss';
import { formatToClient, IEventFormatClient } from '../UserPage/UserEvents/UserEvents.service';
import EventItem from '../UserPage/UserEvents/EventItem/EventItem';
import Spinner from '../shared/Spinner';
import CreateExtraBtn from '../shared/CreateExtraBtn';
import UserEventsEditor from '../UserPage/UserEvents/UserEventsEditor/UserEventsEditor';
import { saveEvent} from '../UserPage/UserEvents/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export interface IEvent {
	title: string;
	description: string;
	location: string;
	date: string;
	photo: string;
	isPrivate: boolean;
}

interface IProps {
	match: {
		path: string;
	};
	getAllEvents: () => any;
	allEvents: any;
	currentUserId: string;
	saveEvent: (event: any) => void;
}

const CREATE_EVENT_TEXT = 'Create event';
const BACK_TO_EVENTS_TEXT = 'Back to event';

const EventList: React.FC<IProps> = props => {
	const { getAllEvents, allEvents } = props;
	const [events, setEvents] = useState();
	const [openEventEditor, setOpenEventEditor] = useState(false);
	useEffect(() => {
		if (!events) {
			getAllEvents();
			setEvents(allEvents);
		}
	});
	const editEvent = () => {
		setOpenEventEditor(!openEventEditor)
	};
	const saveEvent = (event: IEventFormatClient) => {
		props.saveEvent(event);
	};
	console.log(events);
	if (!events) {
		return <Spinner />;
	}
	if (events && allEvents.length !== events.length) {
		setEvents(allEvents);
	}
	return (
		<div className="event-page">
			<div className="event-list-container">
				<CreateExtraBtn
					handleClick={editEvent}
					body={openEventEditor ? BACK_TO_EVENTS_TEXT : CREATE_EVENT_TEXT}
				/>
				{openEventEditor ? (
					<UserEventsEditor
						closeEditor={editEvent}
						saveEvent={saveEvent}
						id={props.currentUserId}
					/>
				) : 
					<div>
				{events.map(unformattedEvent => {
					const event = formatToClient(unformattedEvent);
					return <EventItem event={event} key={event.id} isOwnEvent={false} />;
				})}
				</div>
				}
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => {
	return {
		...props,
		currentUserId: state.profile.profileInfo.id,
	};
};

const mapDispatchToProps = dispatch => {
	const actions = {
		saveEvent
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventList);