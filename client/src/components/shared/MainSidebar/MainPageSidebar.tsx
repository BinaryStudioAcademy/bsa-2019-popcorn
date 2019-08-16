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
					<p>Events</p>
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
					<p>Surveys</p>
				</div>
				<div>
					<p>Tops</p>
				</div>
			</div>
		</div>
	);
};

export default MainPageSidebar;
