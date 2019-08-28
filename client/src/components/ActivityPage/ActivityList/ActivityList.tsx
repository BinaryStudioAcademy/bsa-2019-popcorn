import React from 'react';
import './ActivityList.scss';
import ActivityItem from '../ActivityItem/ActivityItem';
import { NavLink } from 'react-router-dom';

const mockedActivity = [
	{
		type: 'like',
		text: "You liked Dave's post",
		date: '22 June',
		img:
			'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg'
	},
	{
		type: 'comment',
		text: "You commented Mike's post",
		date: '18 June',
		img:
			'https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_.jpg'
	},
	{
		type: 'review',
		text: 'You reviewed Forest Gump',
		date: '18June',
		img:
			'https://www.indiewire.com/wp-content/uploads/2017/11/forrest-gump-1994.jpg?w=780'
	},
	{
		type: 'comment',
		text: "You commented Julia's post",
		date: '18 June',
		img:
			'https://cdn.vox-cdn.com/thumbor/Dc8bBshDmxtKUCeTFovjt_pz_bM=/0x0:1777x999/1200x800/filters:focal(708x235:992x519)/cdn.vox-cdn.com/uploads/chorus_image/image/63756879/parabellumcover.0.jpg'
	},
	{
		type: 'like',
		text: "You liked Mike's post",
		date: '18 june',
		img:
			'https://cdn.images.express.co.uk/img/dynamic/36/590x/IT-movie-sequel-news-940882.jpg'
	}
];

export type Activity = {
	type: string;
	text: string;
	date: string;
	img: string;
	isRead?: boolean;
	url: string;
};

const generateActivity = (
	activities: Array<Activity>,
	readNotification = undefined
) => {
	if (activities.length && activities.length === 0) return [];
	const generatedActivity = activities.map(el => {
		return (
			<NavLink to={el.url} style={{ textDecoration: 'none', color: 'inherit' }}>
				<ActivityItem
					key={el.date}
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
