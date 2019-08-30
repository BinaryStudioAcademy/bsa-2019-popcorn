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
	setNotificitationIsRead: (notificatonId: string) => void;
	firebase?: any;
	unredNotifications: Activity[];
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
		this.props.unredNotifications.length === 0 &&
			this.props.getUnreadNotifications(this.props.userInfo.id);
		this.setState({
			...this.state,
			notifications: this.props.unredNotifications
		});
		this.props.firebase &&
			this.props.firebase.messaging
				.getToken()
				.then(token => this.props.sendTokenToServer(token))
				.catch(e => console.log(e));
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

	toogleNotifications = () => {
		const isShown = !this.state.isShown;
		// if (!isShown) {
		// 	const updatedNotifications = this.state.notifications.filter(
		// 		notification => notification.isRead === false
		// 	);
		// 	this.setState({ notifications: updatedNotifications });
		// } else {
		// }
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
		this.props.setNotificitationIsRead(activityId);
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
						onClick={() => this.toogleNotifications()}
					>
						<DotIcon />
					</div>
				)}
				<img
					className="notify-icon hover"
					src={notifyIcon}
					alt="bell"
					onClick={() => this.toogleNotifications()}
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
