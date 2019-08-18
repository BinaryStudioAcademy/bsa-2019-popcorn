import React from 'react';
import { IEventFormatClient } from '../UserEvents.service';
import './EventItem.scss';
import Moment from 'react-moment';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/general/closeIcon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMapMarkerAlt,
	faVideo,
	faUsers
} from '@fortawesome/free-solid-svg-icons';
import Image from '../../../shared/Image/Image';
import config from '../../../../config';

interface IProps {
	event: IEventFormatClient;
	deleteEvent: null | ((id: string, currentUserId: string) => any);
	editEvent: null | ((event: IEventFormatClient) => any);
	isOwnEvent: boolean;
}

const EventItem: React.FC<IProps> = ({ event, deleteEvent, editEvent, isOwnEvent }) => {
	const {
		id,
		userId: currentUserId,
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
						<Image
							src={image}
							defaultSrc={config.DEFAULT_EVENT_IMAGE}
							alt="events-image"
						/>
					</div>
				</div>
				<div className="event-right">
					<div className="event-main-information">
						<div className="event-title">{title}</div>
						<div className="event-description">{description}</div>
						{/* <div className="event-location">
							<FontAwesomeIcon
								className="icon-location"
								icon={faMapMarkerAlt}
							/>
							<span>Kyiv. Ukraine (mock)</span>
						</div> */}
						{/* <div className="event-movie">
							<FontAwesomeIcon className="icon-movie" icon={faVideo} />
							The Mountain (2019) (mock)
						</div> */}
						<div className="event-users">
							<FontAwesomeIcon className="icon-users" icon={faUsers} />
							{eventVisitors.length} users subscribe
						</div>
					</div>
					<div className="event-date-buttons">
						<div className="event-date-range">
							<Moment format=" D MMM HH:mm " local>
								{String(dateRange.startDate)}
							</Moment>
							-
							<Moment format=" D MMM HH:mm " local>
								{String(dateRange.endDate)}
							</Moment>
						</div>
						{isOwnEvent && (deleteEvent && editEvent !== null ? (
							<div className="event-buttons">
								<button
									className="edit-button"
									onClick={() => editEvent(event)}
								>
									Edit
								</button>
								<button
									className="delete-button"
									onClick={() => deleteEvent(id, currentUserId)}
								>
									<CloseIcon className="delete-button-svg" />
								</button>
							</div>
						) : null)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventItem;
