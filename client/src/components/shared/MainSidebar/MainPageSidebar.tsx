import React from 'react';
import './MainPageSidebar.scss';
import { NavLink } from 'react-router-dom';
import mainPageSidebarConfig from './mainPageSidebarConfig.json';

interface IProps {
	notifications: {
		newMessages: number;
		newEvents: number;
	};
}

const MainPageSidebar = ({ notifications }: IProps) => {
	return (
		<nav className="left-sidebar">
			<ul className="menu">
				{mainPageSidebarConfig.map((tab, index) => (
					<li key={index}>
						<NavLink
							exact={!index}
							to={tab.link}
							className="user-tab"
							activeClassName="user-tab-active"
						>
							{tab.label}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default MainPageSidebar;
