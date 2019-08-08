import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import "./Header.scss";
import messageIcon from '../../assets/icons/header/message-icon.svg';
import searchIcon from '../../assets/icons/header/search-icon.svg';
import notifyIcon from '../../assets/icons/header/notify-icon.svg';
import {NavLink} from 'react-router-dom';

interface IProps {
    userInfo?: { //temporary put ? to use mocks inside component
        name: string,
        image: string
    },
    movies?: Array<string>,
    tv?: Array<string>,
    ratings?: Array<string>
};

const user = {
    name: "Sofi Dub",
    image: "https://s3-alpha-sig.figma.com/img/919e/1a5a/da4f250d469108191ad9d4af68b2a639?Expires=1566172800&Signature=Kou41Z8bd8ig~9nLibgCH5gfaOc0K~9Io82-umabjJnomveXbPcqMWfD911bHy6h77reHT6ecNYFHCzmXkQNy3vEF-OzgJYgV875TI2rX~cPt1FaSJC5wCeybEfTrlBlCcdzSFn8iVcP~C8GTx-l6CIjyugGAhvr7xJ-hfAdlf~5Mll0Sy92dSKn8q7OkJdfsMvEEFVQ3rGHn8GGQZg1a60gif0VaQhuVX1gcRgwrsak~cerS1bnDvo93B1lFOIk85wlhY2hPwQrmCtI9A-qaAtbIxmzmxkRpuVUpDrX6Jd4hXpksbd7urSJ91Dg7tv9WzRZvIkLnPXflCfmPw~slw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
}

const mock = ["Movies in cinema", "Top movies", "On DVD"];

const Header = ({userInfo = user, movies = mock, tv = mock, ratings = mock}: IProps) => {
    return (
        <div className="header">
            <div className="title">Pop Corn</div>
            <button className="header-buttons hover">
                <NavLink to={"/movie-list"} style={{textDecoration: "none"}} className="header-buttons">Movies</NavLink>
                <FontAwesomeIcon icon={faChevronDown}/>
                <div className="modal">
                    {movies.map(movie => <div key={movie} className="hover">{movie}</div>)}
                </div>
            </button>

            <button className="header-buttons hover">
                TV
                <FontAwesomeIcon icon={faChevronDown}/>
                <div className="modal">
                    {tv.map(tvElemenet => <div key={tvElemenet} className="inactive">{tvElemenet}</div>)}
                </div>
            </button>
            <button className="header-buttons hover">
                Ratings
                <FontAwesomeIcon icon={faChevronDown}/>
                <div className="modal">
                    {ratings.map(rating => <div key={rating} className="inactive">{rating}</div>)}
                </div>
            </button>
            <div className="search-area ">
                <span className="search ">
                    <img className="search-icon hover" src={searchIcon} alt="search"/>
                    <input type="text" placeholder="Search" className="search-input"/>
                </span>

                <span className="filter hover">
                    <span>
                        Filter
                        <FontAwesomeIcon icon={faChevronDown}/>
                    </span>
                </span>
            </div>
            <div className="notifications">
                <img className="message-icon hover" src={messageIcon} alt="message"/>
                <img className="notify-icon hover" src={notifyIcon} alt="bell"/>
            </div>
            <NavLink to={"/user-page"} className="user-info hover">
                <img src={userInfo.image} alt="avatar"/>
                <span className="user-name">{userInfo.name}</span>
            </NavLink>
        </div>
    );
}

export default Header;