import React, { useState, useEffect, createRef } from 'react';
import notifyIcon from '../../../assets/icons/general/header/notify-icon.svg';
import { ReactComponent as DotIcon } from '../../../assets/icons/general/header/dot-icon.svg';
import ActivityList from '../../ActivityPage/ActivityList/ActivityList';
import SocketService from '../../../services/socket.service';

interface IProps {
	userInfo: any;
}
interface IState {
	notifications: Array<any>;
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
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	addSocketEvents = () => {
		SocketService.join(this.props.userInfo.id);
		SocketService.on('new-notification', this.addNotification);
	};

	addNotification = data => {
		const notifications = this.state.notifications;
		this.setState({
			notifications: [...notifications, { ...data, isRead: false }]
		});
	};

	toogleNotifications = () => {
		const isShown = !this.state.isShown;
		this.state.notifications.length !== 0 && this.setState({ isShown });
	};

	readNotification = (activityId: string) => {
		const notifications = this.state.notifications;
		let updatedNotification = notifications.filter(
			notification => notification.date == activityId
		)[0];
		updatedNotification.isRead = true;
		const updatedNotifications = notifications.map(notification =>
			notification.date == activityId ? updatedNotification : notification
		);
		this.setState({ notifications: updatedNotifications });
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
