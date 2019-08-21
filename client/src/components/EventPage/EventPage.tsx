import React from 'react';
import EventPageHeader from './EventPageHeader';
import EventPageTabs from './EventPageTabs';
import EventPageTabBody from './EventPageTabBody';
import './EventPage.scss';
import UserEvents from '../UserPage/UserEvents/UserEvents';

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
}

const event: IEvent = {
	title: 'Best event in your life!',
	description:
		'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos iste ipsa commodi nihil eveniet. Eos, rerum modi? Ratione non perspiciatis dicta vel, reprehenderit suscipit cum illo? Placeat unde sint deleniti!',
	location: 'location',
	date: 'Субота, 24 серпня 2019 р. з 13:00 по 19:00',
	photo: 'https://99px.ru/sstorage/53/2017/05/tmb_200648_1245.jpg',
	isPrivate: false
};

const EventPage: React.SFC<IProps> = ({ match }) => {
	const { path: mainPath } = match;

	return (
		<div className="event-page">
			<UserEvents />
			{/* <EventPageHeader event={event} />
			<div className="event-page-main">
				<EventPageTabs mainPath={mainPath} />
				<EventPageTabBody mainPath={mainPath} event={event} />
			</div> */}
		</div>
	);
};

export default EventPage;
