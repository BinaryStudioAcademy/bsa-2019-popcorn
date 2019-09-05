import React, { createRef } from 'react';
import notifyIcon from '../../../assets/icons/general/header/notify-icon.svg';
import { ReactComponent as DotIcon } from '../../../assets/icons/general/header/dot-icon.svg';
import ActivityList, {
	Activity
} from '../../ActivityPage/ActivityList/ActivityList';
import SocketService from '../../../services/socket.service';

interface IProps {
	userInfo: any;
	getUnreadNotifications: (userId: string) => void;
	setNotificationIsRead: (notificationId: string) => void;
	unreadNotifications: Activity[];
}
interface IState {
	notifications: Array<Activity>;
	isShown: boolean;
}

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
		this.props.getUnreadNotifications(this.props.userInfo.id);
	}

	componentDidUpdate(prevProps: IProps) {
		if (prevProps.unreadNotifications !== this.props.unreadNotifications) {
			this.setState({ notifications: this.props.unreadNotifications });
		}
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
			notifications: [{ ...data, isRead: false }, ...notifications]
		});
	};

	toggleNotifications = () => {
		const isShown = !this.state.isShown;
		if (this.state.notifications.length) { this.setState({ isShown }); }
	};

	readNotification = (activityId: string) => {
		const notifications = this.state.notifications;
		const updatedNotification = notifications.filter(
			notification => notification.id === activityId
		)[0];
		updatedNotification.isRead = true;
		const updatedNotifications = notifications.map(notification =>
			notification.id === activityId ? updatedNotification : notification
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
