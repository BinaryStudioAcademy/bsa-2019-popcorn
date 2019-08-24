import React, { useState, useEffect } from 'react';
import './EventPage.scss';
import { formatToClient } from '../UserPage/UserEvents/UserEvents.service';
import EventItem from '../UserPage/UserEvents/EventItem/EventItem';
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
}

const EventList: React.FC<IProps> = props => {
	const { getAllEvents, allEvents } = props;
	const [events, setEvents] = useState([]);
	useEffect(() => {
		if (!events.length) {
			getAllEvents();
			setEvents(allEvents);
		}
	});
	return (
		<div className="event-page">
			<div className="event-list-container">
				{events.map(unformattedEvent => {
					const event = formatToClient(unformattedEvent);
					return <EventItem event={event} key={event.id} isOwnEvent={false} />;
				})}
			</div>
		</div>
	);
};

export default EventList;
