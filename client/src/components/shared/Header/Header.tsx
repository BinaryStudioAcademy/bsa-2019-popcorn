import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import messageIcon from '../../../assets/icons/general/header/message-icon.svg';
import logo from '../../../assets/icons/general/popcorn-logo.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	fetchFilms,
	getUnreadNotifications,
	setNotificationIsRead,
	getFirebaseToken,
	deleteFirebaseToken,
	fetchAdvice
} from '../Header/actions';
import { unauthorize } from '../../authorization/actions';
import { NavLink, Link } from 'react-router-dom';
import { setMovieSeries } from '../../MovieSeriesPage/Movie.redux/actions';
import config from '../../../config';
import Image from '../Image/Image';
import Notification from './Notification';
import { withFirebase } from '../../Firebase';
import { Activity } from '../../ActivityPage/ActivityList/ActivityList';
import { hasUnreadMessages } from './header.service';
import { fetchChats } from '../../ChatPage/ChatPage.redux/actions';
import ContentSearch from '../ContentSearch';
interface IProps {
	userInfo: {
		id: string;
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
		genres: string[];
		cast: string[];
	}>;
	fetchFilms: (data: string) => void;
	alreadySearch: boolean;
	setMovieSeries: (movie: any) => any;
	unauthorize: () => void;
	deleteFirebaseToken: (firebaseToken: any) => void;
	sendTokenToServer: (token: string | null) => void;
	getUnreadNotifications: (userId: string) => void;
	setNotificitationIsRead: (notificatonId: string) => void;
	unredNotifications: Activity[];
	chats: any;
	fetchChats: (userId: string) => void;
	setNotificationIsRead: (notificationId: string) => void;
	unreadNotifications: Activity[];
	firebase?: any;
	firebaseToken: string | null | undefined;
	getFirebaseToken: (firebase: any) => void;
	history: any;
	fetchAdvice: (userId: string) => any;
}

class Header extends React.Component<IProps> {
	componentDidMount() {
		this.props.fetchChats(this.props.userInfo.id);
		if (this.props.firebaseToken === undefined) {
			getFirebaseToken(this.props.firebase);
		}
	}
	render() {
		const {
			userInfo,
			unauthorize,
			getUnreadNotifications,
			chats,
			setNotificationIsRead,
			unreadNotifications,
			firebaseToken,
			deleteFirebaseToken,
		} = this.props;
		const MOVIES_IN_CINEMA = 'Movies in cinema';
		const MOVIE_TOPS = 'Movie tops';
		const USER_MOVIE_TOPS = `${userInfo.name}'s Movie Lists`;
		const POPULAR_MOVIES = 'Popular Movies';
		const POPULAR_TV_SERIES = 'Popular TV Series';
		const POPULAR_USERS = 'Popular Users';
		const PROFILE = 'Profile';
		const SETTINGS = 'Settings';
		const LOGOUT = 'Logout';

		const { avatar } = userInfo;

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
						to={'/movies'}
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
						<Link aria-current="page" className="hover" to="/tops">
							{MOVIE_TOPS}
						</Link>
						<Link aria-current="page" className="hover" to="/user-page/lists">
							{USER_MOVIE_TOPS}
						</Link>
					</div>
				</button>
				<button
					className="header-buttons hover"
					onClick={() => fetchAdvice(userInfo.id)}
				>
					<Link
						to={'/adviceMe'}
						style={{ textDecoration: 'none' }}
						className="header-buttons"
					>
						Advice Me
					</Link>
					{/*<FontAwesomeIcon icon={faChevronDown} />*/}
					{/*<div className="modal">*/}
					{/*	<Link aria-current="page" className="hover" to="#">*/}
					{/*		{NEW_TV_SERIES}*/}
					{/*	</Link>*/}
					{/*	<Link aria-current="page" className="hover" to="#">*/}
					{/*		{TV_SERIES_TOPS}*/}
					{/*	</Link>*/}
					{/*	<Link aria-current="page" className="hover" to="/user-page/lists">*/}
					{/*		{USER_TV_SERIES_TOPS}*/}
					{/*	</Link>*/}
					{/*</div>*/}
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
				<ContentSearch />
				<div className="notifications">
					<div className="notifications-message">
						<NavLink to={'/chat'}>
							{hasUnreadMessages(chats) && (
								<div className="unread-message"></div>
							)}
							<img
								className="message-icon hover"
								src={messageIcon}
								alt="message"
							/>
						</NavLink>
					</div>
					{
						<Notification
							userInfo={userInfo}
							getUnreadNotifications={getUnreadNotifications}
							setNotificationIsRead={setNotificationIsRead}
							unreadNotifications={unreadNotifications}
						/>
					}
				</div>
				<div className="user-info header-buttons hover">
					<Image src={avatar} defaultSrc={config.DEFAULT_AVATAR} alt="avatar" />
					<span className="user-name">{userInfo.name}</span>
					<div className="modal">
						<Link
							aria-current="page"
							className="hover"
							to={`/user-page/${userInfo.id}`}
						>
							{PROFILE}
						</Link>
						<Link aria-current="page" className="hover" to="/settings">
							{SETTINGS}
						</Link>
						<a
							onClick={() => {
								deleteFirebaseToken(firebaseToken);
								unauthorize();
							}}
						>
							{LOGOUT}
						</a>
					</div>
				</div>
			</div>
		);
	}
}

const HeaderWithFirebase = withFirebase(Header);

const mapStateToProps = (rootState, props) => ({
	...props,
	moviesSearch: rootState.movie.moviesSearch,
	alreadySearch: rootState.movie.alreadySearch,
	unredNotifications: rootState.notification.unredNotifications,
	chats: rootState.chat.chats,
	unreadNotifications: rootState.notification.unreadNotifications,
	firebaseToken: rootState.notification.firebaseToken
});

const actions = {
	fetchFilms,
	setMovieSeries,
	unauthorize,
	getUnreadNotifications,
	fetchChats,
	setNotificationIsRead,
	getFirebaseToken,
	deleteFirebaseToken,
	fetchAdvice
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderWithFirebase);
