import React from 'react';
import { IEvent } from '../UserEvents';
import './EventItem.scss';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMapMarkerAlt,
	faVideo,
	faUsers
} from '@fortawesome/free-solid-svg-icons';

interface IProps {
	event: IEvent;
}

const EventItem: React.FC<IProps> = ({ event }) => {
	const {
		title,
		description,
		location,
		image,
		dateRange,
		movieId,
		eventVisitors
	} = event;

	return (
		<div className="event-item">
			<div className="event-wrapper">
				<div className="event-left">
					<div className="event-image-wrapper">
						<img src={image} alt="events-image" />
					</div>
				</div>
				<div className="event-right">
					<div className="event-main-information">
						<div className="event-title">{title}</div>
						<div className="event-description">{description}</div>
						<div className="event-location">
							<FontAwesomeIcon
								className="icon-location"
								icon={faMapMarkerAlt}
							/>
							<span>Kyiv. Ukraine (mock)</span>
						</div>
						{movieId && (
							<div className="event-movie">
								<FontAwesomeIcon className="icon-movie" icon={faVideo} />
								The Mountain (2019) (mock)
							</div>
						)}
						<div className="event-users">
							<FontAwesomeIcon className="icon-users" icon={faUsers} />
							{eventVisitors.length} users subscribe
						</div>
					</div>
					<div className="event-date">
						<div className="event-date-range">
							<Moment format=" D MMM HH:mm " local>
								{dateRange.startDate}
							</Moment>
							-
							<Moment format=" D MMM HH:mm " local>
								{dateRange.endDate}
							</Moment>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventItem;
