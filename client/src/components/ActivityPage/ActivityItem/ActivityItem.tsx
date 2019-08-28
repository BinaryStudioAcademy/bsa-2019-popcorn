import React, { useState } from 'react';
import './ActivityItem.scss';
import { Activity } from '../ActivityList/ActivityList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComments, faStar } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
type ActivityItemProps = {
	activity: Activity;
	readNotification?: (date: string) => void;
};

const generateIcon = type => {
	switch (type) {
		case 'like':
			return (
				<FontAwesomeIcon
					className="activity-icon activity-icon-like"
					icon={faHeart}
				/>
			);
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
	}
};

const ActivityItem = ({
	activity: { type, text, date, img, isRead },
	readNotification
}: ActivityItemProps) => {
	const [markedAsRead, setMarked] = useState(isRead);
	function setRead(activityId: string) {
		isRead = true;
		setMarked(isRead);
		readNotification && readNotification(activityId);
	}
	return (
		<div
			className={`activity-item ${markedAsRead ? ' ' : 'unread-activity'}`}
			onMouseOut={() => setRead && setRead(date)}
		>
			<div>{generateIcon(type)}</div>
			<div>
				<div className="activity-text">{text}</div>
				<div className="activity-date">
					<Moment format=" D MMM HH:mm " local>
						{String(date)}
					</Moment>
				</div>
			</div>
			<img className="activity-img" src={img} />
		</div>
	);
};

export default ActivityItem;
