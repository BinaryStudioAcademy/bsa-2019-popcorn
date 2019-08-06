import React from 'react';
import { NavLink } from 'react-router-dom';
import userTabsConfig from './userTabsConfig.json';

interface IProps {
    mainPath: string
}

const UserPageTabs: React.SFC<IProps> = ({ mainPath }) => {
    return (
        <nav className="user-tabs">
            <ul className="user-tab-list">
                {
                    userTabsConfig.map((tab, index) =>
                        <li key={index}>
                            <NavLink
                                exact={!index}
                                to={mainPath + (!index ? '' : `/${tab}`)}
                                className="user-tab"
                                activeClassName="user-tab-active"
                            >
                                {tab[0].toUpperCase() + tab.slice(1)}
                            </NavLink>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
}

export default UserPageTabs;