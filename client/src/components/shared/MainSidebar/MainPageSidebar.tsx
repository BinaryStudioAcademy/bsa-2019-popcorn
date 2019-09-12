import React from 'react';
import './MainPageSidebar.scss';
import { NavLink } from 'react-router-dom';
import mainPageSidebarConfig from './mainPageSidebarConfig.json';
import { hasUnreadMessages } from '../Header/header.service';

interface IProps {
	notifications: {
		newMessages: number;
		newEvents: number;
	};
	chats: any[];
}

const MainPageSidebar = ({ notifications, chats }: IProps) => {
	return (
		<nav className="left-sidebar">
			<ul className="menu">
				{mainPageSidebarConfig.map((tab, index) => (
					<li key={index}>
						<NavLink
							exact={!index}
							to={tab.link}
							className="main-page-tab"
							activeClassName="main-page-tab-active"
						>
							{tab.label}
						</NavLink>
						{tab.link === '/chat' && hasUnreadMessages(chats) && (
							<div className="unread-message"></div>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default MainPageSidebar;
