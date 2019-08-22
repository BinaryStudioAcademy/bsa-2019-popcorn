import React from 'react';
import './MainPageSidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import config from '../../../config';

interface IProps {
	notifications: {
		newMessages: number;
		newEvents: number;
	};
}

const MainPageSidebar = ({ notifications }: IProps) => {
	return (
		<div className="left-sidebar">
			<div className="menu">
				<div>
					<NavLink to={'/'}>Home</NavLink>
				</div>
				<div>
					<p>Messages</p>
					{notifications.newMessages !== 0 && (
						<p className="notifications">
							<span>{notifications.newMessages}</span>
						</p>
					)}
				</div>

				<div>
					<NavLink to={'/event-page/'}>Events</NavLink>
					{notifications.newEvents !== 0 && (
						<p className="notifications">
							<span>{notifications.newEvents}</span>
						</p>
					)}
				</div>
				<div>
					<p>Collections</p>
				</div>
				<div>
					<NavLink to={'/surveys-list/'}>Surveys</NavLink>
				</div>
				<div>
					<NavLink to={'/movie-tops/'}>Tops</NavLink>
				</div>
			</div>
		</div>
	);
};

export default MainPageSidebar;
