import React from 'react';

import "./Header.scss";

interface IProps {
    userInfo: {
        name: string,
        image: string
    },
};

const ArrowDown = () => {
    return (
        <svg className="arrowDown " width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 0.633057L3.83714 4.42849" stroke="#122737" />
            <path d="M4.16211 4.42847L0.999246 0.63303" stroke="#122737" />
        </svg>
    )
}
const SearchIcon = () => {
    return (
        <svg className="searchIcon hover" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.82113 0.646973C3.09403 0.646973 0.882812 2.85819 0.882812 5.58531C0.882812 8.31244 3.09403 10.5237 5.82115 10.5237C6.86984 10.5237 7.84238 10.1966 8.64182 9.6394L8.6424 9.63882L12.3049 13.3013C12.3729 13.3693 12.4809 13.371 12.5507 13.3013L13.5378 12.3142C13.6057 12.2463 13.6022 12.1336 13.5372 12.0685L9.87522 8.40656C10.4324 7.60654 10.7595 6.63398 10.7595 5.58531C10.7595 2.85819 8.54826 0.646973 5.82113 0.646973ZM5.82113 9.36169C3.73541 9.36169 2.04476 7.67104 2.04476 5.58531C2.04476 3.49959 3.73543 1.80894 5.82113 1.80894C7.90684 1.80894 9.59751 3.49959 9.59751 5.58531C9.59751 7.67104 7.90686 9.36169 5.82113 9.36169Z" fill="black" fill-opacity="0.7" />

        </svg>)
}
const MessageIcon = () => {
    return (
        <svg className="messageIcon hover" width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0V12.5945H19V0H0ZM9.5001 7.77761L1.70706 0.934204H17.2929L9.5001 7.77761ZM6.3957 6.29503L0.934204 11.0911V1.49895L6.3957 6.29503ZM7.10358 6.91676L9.49986 9.02112L11.8961 6.91676L17.2978 11.6603H1.70217L7.10358 6.91676ZM12.6041 6.29526L18.0658 1.49895V11.0911L12.6041 6.29526Z" fill="black" fill-opacity="0.5" />
        </svg>)

}
const NotifyIcon = () => {
    return (
        <div className="notifyIcon hover"> <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.9503 14.3169L12.7484 12.3134C12.1933 11.3887 11.9 10.3295 11.9 9.25151V7.49653C11.9 5.28094 10.4215 3.40698 8.39983 2.80284V1.54631C8.39983 0.774165 7.77191 0.14624 6.99976 0.14624C6.22762 0.14624 5.5997 0.774165 5.5997 1.54631V2.80284C3.57804 3.40698 2.09958 5.28094 2.09958 7.49653V9.25151C2.09958 10.3295 1.80626 11.388 1.25184 12.3127L0.0499042 14.3162C-0.0151984 14.4247 -0.0166093 14.5591 0.0457041 14.669C0.108017 14.7789 0.223522 14.8468 0.349527 14.8468H13.65C13.776 14.8468 13.8922 14.779 13.9545 14.6698C14.0169 14.5605 14.0148 14.4247 13.9503 14.3169Z" fill="black" fill-opacity="0.5" />
        </svg>
            <svg width="6" height="3" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.740234 0.793091C1.13505 1.61773 1.97088 2.19316 2.9446 2.19316C3.91831 2.19316 4.75418 1.61773 5.149 0.793091H0.740234Z" fill="black" fill-opacity="0.5" />
            </svg>
        </div>
    )
}


const Header = ({ userInfo }: IProps) => {
    return (
        <div className="header">
            <div className="title">Pop Corn</div>
            <button className="headerButtons hover">
                Movies
            <ArrowDown />
            </button>
            <button className="headerButtons hover">
                TV
            <ArrowDown />
            </button>
            <button className="headerButtons hover">
                Ratings
            <ArrowDown />
            </button>
            <div className="searchArea ">
                <span className="search ">
                    <SearchIcon />
                    <input type="text" placeholder="Search" className="searchInput" />
                </span>
                <span className="filter hover">
                    Filter
                     <ArrowDown />
                </span>
            </div>
            <div className="notifications">
                <MessageIcon />
                <NotifyIcon />
            </div>
            <div className="userInfo hover">
                <img src={userInfo.image} alt="avatar" />
                <span className="user-name">{userInfo.name}</span>
            </div>
        </div>
    );
}

export default Header;