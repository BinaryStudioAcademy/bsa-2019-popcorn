import React, { createRef } from 'react';
import notifyIcon from '../../../assets/icons/general/header/notify-icon.svg';
import { ReactComponent as DotIcon } from '../../../assets/icons/general/header/dot-icon.svg';
import ActivityList, {
	Activity
} from '../../ActivityPage/ActivityList/ActivityList';
import SocketService from '../../../services/socket.service';

interface IProps {
	userInfo: any;
	sendTokenToServer: (token: string | null) => void;
	getUnreadNotifications: (userId: string) => void;
	setNotificationIsRead: (notificationId: string) => void;
	firebase?: any;
	unreadNotifications: Activity[];
}
interface IState {
	notifications: Array<Activity>;
	isShown: boolean;
}
let canSendToken = true;
class Notification extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			notifications: [],
			isShown: false
		};
		this.addSocketEvents();
	}
	private wrapperRef = createRef<HTMLDivElement>();
	handleClickOutside = event => {
		if (
			this.wrapperRef.current &&
			!this.wrapperRef.current.contains(event.target)
		) {
			this.setState({ isShown: false });
		}
	};
	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
		this.props.unreadNotifications.length === 0 &&
			this.props.getUnreadNotifications(this.props.userInfo.id);
		this.setState({
			...this.state,
			notifications: this.props.unreadNotifications
		});
		canSendToken &&
			this.props.firebase &&
			this.props.firebase.messaging
				.getToken()
				.then(token => {
					canSendToken = false;
					this.props.sendTokenToServer(token);
				})
				.catch(e => {
					canSendToken = false;
				});
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	addSocketEvents = () => {
		SocketService.join(this.props.userInfo.id);
		SocketService.on('new-notification', this.addNotification);
	};

	addNotification = (data: Activity) => {
		const notifications = this.state.notifications;
		this.setState({
			notifications: [...notifications, { ...data, isRead: false }]
		});
	};

	toggleNotifications = () => {
		const isShown = !this.state.isShown;
		this.state.notifications.length !== 0 && this.setState({ isShown });
	};

	readNotification = (activityId: string) => {
		const notifications = this.state.notifications;
		let updatedNotification = notifications.filter(
			notification => notification.id == activityId
		)[0];
		updatedNotification.isRead = true;
		const updatedNotifications = notifications.map(notification =>
			notification.id == activityId ? updatedNotification : notification
		);
		this.setState({ notifications: updatedNotifications });
		this.props.setNotificationIsRead(activityId);
	};

	render() {
		const { isShown, notifications } = this.state;
		const isAllRed = this.state.notifications.every(
			notification => notification.isRead === true
		);
		return (
			<div className="notification-header" ref={this.wrapperRef}>
				{!isAllRed && (
					<div
						className="dot-icon hover"
						onClick={() => this.toggleNotifications()}
					>
						<DotIcon />
					</div>
				)}
				<img
					className="notify-icon hover"
					src={notifyIcon}
					alt="bell"
					onClick={() => this.toggleNotifications()}
				/>
				{isShown ? (
					<div className="">
						<ActivityList
							readNotification={this.readNotification}
							activities={notifications}
						/>
					</div>
				) : null}
			</div>
		);
	}
}

export default Notification;
