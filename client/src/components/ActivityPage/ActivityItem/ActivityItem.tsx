import React, { useState } from 'react';
import './ActivityItem.scss';
import { Activity } from '../ActivityList/ActivityList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faStar } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { getIcon } from '../../MainPage/Post/PostReaction/PostReaction';
type ActivityItemProps = {
	activity: Activity;
	readNotification?: (date: string) => void;
};

const generateIcon = type => {
	switch (type) {
		case 'comment':
			return (
				<FontAwesomeIcon
					className="activity-icon activity-icon-comment"
					icon={faComments}
				/>
			);
		case 'review':
			return (
				<FontAwesomeIcon
					className="activity-icon activity-icon-review"
					icon={faStar}
				/>
			);
		default:
			return <div className="activity-icon-default"> {getIcon(type)}</div>;
	}
};

const ActivityItem = ({
	activity: { type, title, body, date, img, isRead, id },
	readNotification
}: ActivityItemProps) => {
	const [markedAsRead, setMarked] = useState(isRead);
	function setRead(activityId: string) {
		isRead = true;
		setMarked(isRead);
		if (readNotification) {
			readNotification(activityId);
		}
	}
	return (
		<div
			className={`activity-item ${markedAsRead ? ' ' : 'unread-activity'}`}
			onMouseEnter={() => setRead && setRead(id)}
		>
			<div>{generateIcon(type)}</div>
			<div>
				<div className="activity-text">{title}</div>
				<div className="activity-text">{body}</div>
				<div className="activity-date">
					<Moment format=" D MMM HH:mm " local={true}>
						{String(date)}
					</Moment>
				</div>
			</div>
			<img className="activity-img" src={img} />
		</div>
	);
};

export default ActivityItem;
