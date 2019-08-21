import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
	IEventFormatClient,
	IDiscussionUser
} from '../UserPage/UserEvents/UserEvents.service';
import config from '../../config';

interface IProps {
	event: IEventFormatClient;
	subscibeToEvent: ({ eventId, userId, status }) => void;
	currentUser: IDiscussionUser;
}

const EventPageHeader: React.FC<IProps> = ({
	event,
	subscibeToEvent,
	currentUser
}) => {
	const userId = currentUser.id;
	const eventId = event.id;
	return (
		<header className="event-page-header">
			<div className="event-image">
				<img
					src={event.image || config.DEFAULT_EVENT_IMAGE}
					alt="event image"
				/>
			</div>
			<div className="header-basic">
				<span className="header-title">{event.title}</span>
				<div className="header-meta-info">
					<div className="meta-info-left">
						<div className="meta-info-item">
							<FontAwesomeIcon icon={faStar} />
							<span
								className="meta-info-name"
								onClick={() =>
									subscibeToEvent({ userId, eventId, status: 'interested' })
								}
							>
								Interested
							</span>
						</div>
						<div className="meta-info-item">
							<FontAwesomeIcon icon={faPlus} />
							<span
								className="meta-info-name"
								onClick={() =>
									subscibeToEvent({ userId, eventId, status: 'going' })
								}
							>
								Going
							</span>
						</div>
					</div>
					<div className="meta-info-item">
						<FontAwesomeIcon icon={faEnvelope} />
						<span className="meta-info-name">Invite</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default EventPageHeader;
