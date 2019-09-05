import React from 'react';
import './MainPageSidebar.scss';
import { NavLink } from 'react-router-dom';

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
				</div>

				<div>
					<NavLink to={'/events/'}>Events</NavLink>
				</div>
				<div>
					<p>Collections</p>
				</div>
				<div>
					<NavLink to={'/surveys'}>Surveys</NavLink>
				</div>
				<div>
					<NavLink to={'/tops'}>Tops</NavLink>
				</div>
			</div>
		</div>
	);
};

export default MainPageSidebar;
