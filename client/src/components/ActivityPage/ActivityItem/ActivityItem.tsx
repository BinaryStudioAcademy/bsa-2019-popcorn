import React from 'react';
import './ActivityItem.scss';
import { Activity } from '../ActivityList/ActivityList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComments, faStar } from '@fortawesome/free-solid-svg-icons';

type ActivityItemProps = {
	activity: Activity;
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
	activity: { type, text, date, img }
}: ActivityItemProps) => {
	return (
		<div className="activity-item">
			<div>{generateIcon(type)}</div>
			<div>
				<div className="activity-text">{text}</div>
				<div className="activity-date">{date}</div>
			</div>
			<img className="activity-img" src={img} />
		</div>
	);
};

export default ActivityItem;
