import React from 'react';
import './ActivityList.scss';
import ActivityItem from '../ActivityItem/ActivityItem';
import { NavLink } from 'react-router-dom';

export type Activity = {
	type: string;
	title: string;
	body: string;
	date: string;
	img: string;
	isRead?: boolean;
	url: string;
	id: string;
};

const generateActivity = (
	activities: Array<Activity>,
	readNotification = undefined
) => {
	if (activities.length && activities.length === 0) {
		return [];
	}
	const generatedActivity = activities.map(el => {
		return (
			<NavLink
				key={el.id}
				to={el.url}
				style={{ textDecoration: 'none', color: 'inherit' }}
			>
				<ActivityItem
					key={el.id}
					activity={el}
					readNotification={readNotification}
				/>
			</NavLink>
		);
	});
	return generatedActivity;
};

const ActivityList = ({ activities, readNotification }) => {
	return (
		<div className="activity-list">
			{generateActivity(activities, readNotification)}
		</div>
	);
};

export default ActivityList;
