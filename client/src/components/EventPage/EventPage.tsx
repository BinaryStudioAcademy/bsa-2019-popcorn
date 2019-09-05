import React, { useState, useEffect } from 'react';
import EventPageHeader from './EventPageHeader';
import EventPageTabs from './EventPageTabs';
import EventPageTabBody from './EventPageTabBody';
import './EventPage.scss';
import {
	formatToClient,
	IEventFormatDataBase,
	IDiscussionUser
} from '../UserPage/UserEvents/UserEvents.service';
import Spinner from '../shared/Spinner';

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
		url: string;
		params: {
			id: string;
		};
	};
	getEventById: (eventId: string) => void;
	searchedEvent: IEventFormatDataBase;
	currentUser: IDiscussionUser;
	subscibeToEvent: ({ eventId, userId, status }) => void;
}

const EventPage: React.FC<IProps> = ({
	match,
	getEventById,
	searchedEvent,
	currentUser,
	subscibeToEvent
}) => {
	const { url: mainPath } = match;
	const [event, setEvent] = useState();

	function subscibe({ eventId, userId, status }) {
		let isVisitor = false;
		const eventVisitors = event.eventVisitors.map(visitor => {
			if (visitor.userId === userId) {
				isVisitor = true;
				return { ...visitor, status };
			}
			else { return visitor };
		});
		if (!isVisitor) {
			eventVisitors.push({
				eventId,
				userId,
				status,
				id: new Date(),
				user: currentUser
			});
		}
		const updatedEvent = { ...event, eventVisitors };
		setEvent(updatedEvent);
		subscibeToEvent({ eventId, userId, status });
	}
	useEffect(() => {
		if (!event || match.params.id !== event.id) {
			getEventById(match.params.id);
			searchedEvent && setEvent(formatToClient(searchedEvent));
		}
	});

	if (!event || match.params.id !== event.id) return <Spinner />;
	return (
		<div className="event-page">
			<EventPageHeader
				event={event}
				subscibeToEvent={subscibe}
				currentUser={currentUser}
				mainPath={mainPath}
			/>
			<div className="event-page-main">
				<EventPageTabs mainPath={mainPath} />
				<EventPageTabBody
					mainPath={mainPath}
					event={event}
					currentUser={currentUser}
				/>
			</div>
		</div>
	);
};

export default EventPage;
