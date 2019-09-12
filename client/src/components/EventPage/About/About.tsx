import React, { useState } from 'react';
import Modal from 'react-responsive-modal';
import Moment from 'react-moment';
import './About.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faClock,
	faMapMarker,
	faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { IEventFormatClient } from '../../UserPage/UserEvents/UserEvents.service';
import MapComponent from '../../UserPage/UserEvents/EventMap/Map';

interface IProps {
	event: IEventFormatClient;
}

const About: React.SFC<IProps> = ({ event }) => {
	const [locationMap, setLocationMap] = useState(false);

	return (
		<div className="about-event">
			{event.dateRange ? (
				<div className="date">
					<FontAwesomeIcon className="icon" icon={faClock} />
					<span>
						{event.dateRange.startDate ? (
							<Moment format=" D MMM HH:mm " local={true}>
								{String(event.dateRange.startDate)}
							</Moment>
						) : null}
						{event.dateRange.endDate ? ' -' : ''}
						{event.dateRange.endDate ? (
							<Moment format=" D MMM HH:mm " local={true}>
								{String(event.dateRange.endDate)}
							</Moment>
						) : null}
					</span>
				</div>
			) : null}
			{event.location.lat && event.location.lng ? (
				<div className="location">
					<div className="location-info">
						<MapComponent currentLocation={event.location} readOnly={true} />
					</div>
				</div>
			) : null}
			{event.description ? (
				<div className="details">
					<FontAwesomeIcon className="icon" icon={faInfoCircle} />
					<span>{event.description}</span>
				</div>
			) : null}
		</div>
	);
};

export default About;
