import React from 'react';
import { NavLink } from 'react-router-dom';
import eventTabsConfig from './eventTabsConfig.json';

interface IProps {
	mainPath: string;
}

const EventPageTabs: React.SFC<IProps> = ({ mainPath }) => {
	return (
		<nav className="event-page-tabs">
			<ul className="event-page-tab-list">
				{eventTabsConfig.map((tab, index) => (
					<li key={index}>
						<NavLink
							exact={!index}
							to={mainPath + tab.link}
							className="event-page-tab"
							activeClassName="event-page-tab-active"
						>
							{tab.label}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default EventPageTabs;
