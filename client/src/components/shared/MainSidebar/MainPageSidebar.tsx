import React from 'react';
import "./MainPageSidebar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

interface IProps {
    userInfo: {
        name: string,
        image: string
    },
    notifications: {
        newFriends: number,
        newMessages: number,
        newEvents: number
    }
};

const MessageIcon = () => {
    return (
        <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0V12.5945H19V0H0ZM9.5001 7.77761L1.70706 0.934204H17.2929L9.5001 7.77761ZM6.3957 6.29503L0.934204 11.0911V1.49895L6.3957 6.29503ZM7.10358 6.91676L9.49986 9.02112L11.8961 6.91676L17.2978 11.6603H1.70217L7.10358 6.91676ZM12.6041 6.29526L18.0658 1.49895V11.0911L12.6041 6.29526Z" fill="black" fillOpacity="0.5"/>
        </svg>
    );
}

const MainPageSidebar = ({ userInfo, notifications }: IProps) => {
    return (
        <div className="left-sidebar">
            <div className="avatar">
                <img src={userInfo.image} alt="avatar" />
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <p className="user-name"><span>{userInfo.name}</span></p>
            <div className="menu">
                <div>
                    <NavLink to={"/"}>Home</NavLink>
                </div>
                <div>
                    <p>Friends</p>
                    {
                        notifications.newFriends !== 0 && 
                        <p className="notifications"><span>{notifications.newFriends}</span></p>
                    }
                </div>
                <div>
                    <p>Messages</p>
                    {
                        notifications.newMessages !== 0 && 
                        <p className="notifications"><span>{notifications.newMessages}</span></p>
                    }
                </div>

                <div>
                    <p>Events</p>
                    {
                        notifications.newEvents !== 0 &&
                        <p className="notifications"><span>{notifications.newEvents}</span></p>
                    }
                </div>
                <div>
                    <p>Collections</p>
                </div>
                <div>
                    <p>Actors</p>
                </div>
                <div>
                    <p>Tops</p>
                </div>
            </div>
        </div>
    );
};

export default MainPageSidebar;