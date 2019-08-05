import React from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
    mainPath: string
}

const UserPageTabs: React.SFC<IProps> = ({ mainPath }) => {
    return (
        <nav className="user-tabs">
            <ul className="user-tab-list">
                <li><NavLink exact to={`${mainPath}`} className="user-tab" activeClassName="user-tab-active">Profile</NavLink></li>
                <li><NavLink to={`${mainPath}/activity`} className="user-tab" activeClassName="user-tab-active">Activity</NavLink></li>
                <li><NavLink to={`${mainPath}/reviews`} className="user-tab" activeClassName="user-tab-active">Reviews</NavLink></li>
                <li><NavLink to={`${mainPath}/events`} className="user-tab" activeClassName="user-tab-active">Events</NavLink></li>
                <li><NavLink to={`${mainPath}/surveys`} className="user-tab" activeClassName="user-tab-active">Surveys</NavLink></li>
                <li><NavLink to={`${mainPath}/tops`} className="user-tab" activeClassName="user-tab-active">Tops</NavLink></li>
                <li><NavLink to={`${mainPath}/lists`} className="user-tab" activeClassName="user-tab-active">Lists</NavLink></li>
                <li><NavLink to={`${mainPath}/watched`} className="user-tab" activeClassName="user-tab-active">Watched</NavLink></li>
            </ul>
        </nav>
    );
}

export default UserPageTabs;