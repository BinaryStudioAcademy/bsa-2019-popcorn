import React from 'react';
import { IEvent } from '../UserEvents';

interface IProps {
	event: IEvent;
}

const EventItem: React.FC<IProps> = ({ event }) => {
	console.log(event);
	return <div></div>;
};

export default EventItem;
