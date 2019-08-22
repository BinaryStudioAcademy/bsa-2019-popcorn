import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
	IEventFormatClient,
	IDiscussionUser
} from '../UserPage/UserEvents/UserEvents.service';
import { NavLink } from 'react-router-dom';
import config from '../../config';

interface IProps {
	event: IEventFormatClient;
	subscibeToEvent: ({ eventId, userId, status }) => void;
	currentUser: IDiscussionUser;
	mainPath: string;
}

const EventPageHeader: React.FC<IProps> = ({
	event,
	subscibeToEvent,
	currentUser,
	mainPath
}) => {
	const userId = currentUser.id;
	const eventId = event.id;
	const userVisitor = event.eventVisitors.filter(
		visitor => visitor.userId === userId
	)[0];
	const userStatus = userVisitor && userVisitor.status;
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
						<NavLink to={mainPath + '/participants'}>
							<button
								className={`meta-info-item ${
									userStatus === 'going' ? 'disabled' : ' '
								}`}
								disabled={userStatus === 'going' ? true : false}
								onClick={() =>
									subscibeToEvent({ userId, eventId, status: 'going' })
								}
							>
								<FontAwesomeIcon icon={faPlus} />
								<span className="meta-info-name">Going</span>
							</button>
						</NavLink>
						<NavLink to={mainPath + '/interested'}>
							<button
								className={`meta-info-item ${
									userStatus === 'interested' ? 'disabled' : ' '
								}`}
								disabled={userStatus === 'interested' ? true : false}
								onClick={() =>
									subscibeToEvent({ userId, eventId, status: 'interested' })
								}
							>
								<FontAwesomeIcon icon={faStar} />
								<span className="meta-info-name">Interested</span>
							</button>
						</NavLink>
					</div>
					{/* <div className="meta-info-item">
						<FontAwesomeIcon icon={faEnvelope} />
						<span className="meta-info-name">Invite</span>
					</div> */}
				</div>
			</div>
		</header>
	);
};

export default EventPageHeader;
