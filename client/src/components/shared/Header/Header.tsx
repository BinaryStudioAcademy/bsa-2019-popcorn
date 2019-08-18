import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import messageIcon from '../../../assets/icons/general/header/message-icon.svg';
import notifyIcon from '../../../assets/icons/general/header/notify-icon.svg';
import logo from '../../../assets/icons/general/popcorn-logo.svg';
import MovieSearch from '../../MovieList/MovieSearch/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFilms } from '../Header/actions';
import { unauthorize } from '../../authorization/actions';
import { NavLink, Link } from 'react-router-dom';
import { setMovieSeries } from '../../MovieSeriesPage/Movie.redux/actions';
import config from '../../../config';
import Image from '../Image/Image';

interface IProps {
	userInfo: {
		//temporary put ? to use mocks inside component
		name: string;
		image: string;
		avatar?: string;
	};
	moviesSearch?: Array<{
		id: string;
		title: string;
		year: Date;
		image: string;
		duration: string;
		genres: Array<string>;
		cast: Array<string>;
	}>;
	fetchFilms: () => void;
	alreadySearch: boolean;
	setMovieSeries: (movie: any) => any;
	unauthorize: () => void;
}

const user = {
	name: 'Sofi Dub',
	image:
		'https://s3-alpha-sig.figma.com/img/919e/1a5a/da4f250d469108191ad9d4af68b2a639?Expires=1566172800&Signature=Kou41Z8bd8ig~9nLibgCH5gfaOc0K~9Io82-umabjJnomveXbPcqMWfD911bHy6h77reHT6ecNYFHCzmXkQNy3vEF-OzgJYgV875TI2rX~cPt1FaSJC5wCeybEfTrlBlCcdzSFn8iVcP~C8GTx-l6CIjyugGAhvr7xJ-hfAdlf~5Mll0Sy92dSKn8q7OkJdfsMvEEFVQ3rGHn8GGQZg1a60gif0VaQhuVX1gcRgwrsak~cerS1bnDvo93B1lFOIk85wlhY2hPwQrmCtI9A-qaAtbIxmzmxkRpuVUpDrX6Jd4hXpksbd7urSJ91Dg7tv9WzRZvIkLnPXflCfmPw~slw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
};

const Header = ({
	userInfo,
	moviesSearch,
	fetchFilms,
	alreadySearch,
	setMovieSeries,
	unauthorize
}: IProps) => {
	const MOVIES_IN_CINEMA = 'Movies in cinema';
	const MOVIE_TOPS = 'Movie tops';
	const USER_MOVIE_TOPS = `${userInfo.name}'s Movie Lists`;
	const NEW_TV_SERIES = 'New TV Series';
	const TV_SERIES_TOPS = 'TV Series tops';
	const USER_TV_SERIES_TOPS = `${userInfo.name}'s TV Series Lists`;
	const POPULAR_MOVIES = 'Popular Movies';
	const POPULAR_TV_SERIES = 'Popular TV Series';
	const POPULAR_USERS = 'Popular Users';
	const PROFILE = 'Profile';
	const SETTINGS = 'Settings';
	const LOGOUT = 'Logout';
	return (
		<div className="header">
			<NavLink to="/" className="header-logo-link">
				<div className="logo-wrapper">
					<img src={logo} className="logo" alt="logo" />
				</div>
				<div className="title">Pop Corn</div>
			</NavLink>
			<button className="header-buttons hover">
				<NavLink
					to={'/movie-list'}
					style={{ textDecoration: 'none' }}
					className="header-buttons"
				>
					Movies
				</NavLink>
				<FontAwesomeIcon icon={faChevronDown} />
				<div className="modal">
					<Link aria-current="page" className="hover" to="#">
						{MOVIES_IN_CINEMA}
					</Link>
					<Link aria-current="page" className="hover" to="/movie-tops">
						{MOVIE_TOPS}
					</Link>
					<Link aria-current="page" className="hover" to="/user-page/lists">
						{USER_MOVIE_TOPS}
					</Link>
				</div>
			</button>

			<button className="header-buttons hover">
				TV
				<FontAwesomeIcon icon={faChevronDown} />
				<div className="modal">
					<Link aria-current="page" className="hover" to="#">
						{NEW_TV_SERIES}
					</Link>
					<Link aria-current="page" className="hover" to="#">
						{TV_SERIES_TOPS}
					</Link>
					<Link aria-current="page" className="hover" to="/user-page/lists">
						{USER_TV_SERIES_TOPS}
					</Link>
				</div>
			</button>
			<button className="header-buttons hover">
				Ratings
				<FontAwesomeIcon icon={faChevronDown} />
				<div className="modal">
					<Link aria-current="page" className="hover" to="#">
						{POPULAR_MOVIES}
					</Link>
					<Link aria-current="page" className="hover" to="#">
						{POPULAR_TV_SERIES}
					</Link>
					<Link aria-current="page" className="hover" to="#">
						{POPULAR_USERS}
					</Link>
				</div>
			</button>
			<MovieSearch
				movies={moviesSearch}
				fetchFilms={fetchFilms}
				alreadySearch={alreadySearch}
				setMovieSeries={setMovieSeries}
			/>
			<div className="notifications">
				<img className="message-icon hover" src={messageIcon} alt="message" />
				<NavLink to={'/user-activity'}>
					<img className="notify-icon hover" src={notifyIcon} alt="bell" />
				</NavLink>
			</div>
			<div className="user-info header-buttons hover">
				<Image
					src={userInfo.avatar}
					defaultSrc={config.DEFAULT_AVATAR}
					alt="avatar"
				/>
				<span className="user-name">{userInfo.name}</span>
				<div className="modal">
					<Link aria-current="page" className="hover" to="/user-page">
						{PROFILE}
					</Link>
					<Link aria-current="page" className="hover" to="/settings">
						{SETTINGS}
					</Link>
					<a onClick={() => unauthorize()}>{LOGOUT}</a>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	moviesSearch: rootState.movie.moviesSearch,
	alreadySearch: rootState.movie.alreadySearch,
	...props
});

const actions = {
	fetchFilms,
	setMovieSeries,
	unauthorize
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
