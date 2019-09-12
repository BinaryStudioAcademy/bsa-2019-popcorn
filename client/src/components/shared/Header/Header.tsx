import React from 'react';
import './Header.scss';
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
import Notification from './Notification';
import { withFirebase } from '../../Firebase';
import { Activity } from '../../ActivityPage/ActivityList/ActivityList';
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
	setNotificationIsRead: (notificationId: string) => void;
	unreadNotifications: Activity[];
	firebase?: any;
	firebaseToken: string | null | undefined;
	getFirebaseToken: (firebase: any) => void;
	chats: any;
	fetchChats: (userId: string) => void;
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
			setNotificationIsRead,
			unreadNotifications,
			firebaseToken,
			deleteFirebaseToken
		} = this.props;
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
				<div className="header-right">
					<ContentSearch />
					<div className="notifications">
						<Notification
							userInfo={userInfo}
							getUnreadNotifications={getUnreadNotifications}
							setNotificationIsRead={setNotificationIsRead}
							unreadNotifications={unreadNotifications}
						/>
					</div>
					<div className="user-info header-buttons hover">
						<img
							src={userInfo.avatar ? userInfo.avatar : config.DEFAULT_AVATAR}
							alt="avatar"
						/>
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
	unreadNotifications: rootState.notification.unreadNotifications,
	firebaseToken: rootState.notification.firebaseToken
});

const actions = {
	fetchFilms,
	setMovieSeries,
	unauthorize,
	getUnreadNotifications,
	setNotificationIsRead,
	getFirebaseToken,
	deleteFirebaseToken,
	fetchAdvice,
	fetchChats
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderWithFirebase);
