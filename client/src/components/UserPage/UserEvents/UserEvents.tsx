import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../../shared/Spinner/index';
import CreateExtraBtn from '../../shared/CreateExtraBtn';
import { getUserEvents, saveEvent, deleteEvent, updateEvent } from './actions';

import {
	IEventFormatDataBase,
	IEventFormatClient,
	formatToClient
} from './UserEvents.service';
import EventItem from './EventItem/EventItem';
import './UserEvents.scss';
import UserEventsEditor from './UserEventsEditor/UserEventsEditor';

interface IProps {
	userEvents: IEventFormatDataBase[];
	getUserEvents: (id: string) => any;
	deleteEvent: (id: string, currentUserId: string) => any;
	currentUserId: string;
	currentUserRole: string;
	selectedUserId: string;
	isOwnData: boolean;
	saveEvent: (event: any) => void;
	updateEvent: (event: any) => void;
	currentProfileUserId: string;
	setSpinner: boolean;
}

interface IState {
	openEventEditor: boolean;
	mainButtonMessage: string;
	editableEvent: null | IEventFormatClient;
}

const CREATE_EVENT_TEXT = 'Create event';
const BACK_TO_EVENTS_TEXT = 'Back to event';

class UserEvents extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			openEventEditor: false,
			mainButtonMessage: 'Create event',
			editableEvent: null
		};
	}

	componentDidMount() {
		const { currentProfileUserId } = this.props;
		this.props.getUserEvents(currentProfileUserId);
	}

	editEvent = (editableEvent: null | IEventFormatClient = null) => {
		const openEventEditor = !this.state.openEventEditor;
		this.setState({ ...this.state, editableEvent, openEventEditor });
	};

	saveOrEditEvent = (event: IEventFormatClient) => {
		const editableEvent = this.state.editableEvent;
		if (editableEvent) {
			this.props.updateEvent(event);
		} else {
			this.props.saveEvent(event);
		}
	};

	renderEventList = (eventList: IEventFormatClient[], deleteEventAction: any) =>
		eventList.map(event => (
			<EventItem
				event={event}
				key={event.id}
				deleteEvent={deleteEventAction}
				editEvent={this.editEvent}
				isOwnEvent={this.props.isOwnData}
			/>
		));

	render() {
		const { userEvents, currentUserId, deleteEvent, isOwnData } = this.props;
		const { openEventEditor, editableEvent } = this.state;
		const ownEvents: IEventFormatClient[] = [];
		const subscribeEvents: IEventFormatClient[] = [];

		userEvents && userEvents.forEach(event => {
			event.userId === currentUserId
				? ownEvents.push(formatToClient(event))
				: subscribeEvents.push(formatToClient(event));
		});
		if (this.props.setSpinner) {
			return <Spinner />;
		}
		return (
			<div className="user-events">
				{isOwnData && (
					<CreateExtraBtn
						handleClick={() => this.editEvent()}
						body={openEventEditor ? BACK_TO_EVENTS_TEXT : CREATE_EVENT_TEXT}
					/>
				)}
				{openEventEditor ? (
					<UserEventsEditor
						closeEditor={this.editEvent}
						event={editableEvent}
						saveEvent={this.saveOrEditEvent}
						id={currentUserId}
					/>
				) : (
					<div>
						{isOwnData && (
							<div>
								<div className="events-title">
									<span>Your Events</span>
								</div>
								<div className="event-list-container">
									{ownEvents.length === 0 ? (
										<div className="event-show-warning">
											No events yet. You can create
										</div>
									) : (
										this.renderEventList(ownEvents, deleteEvent)
									)}
								</div>
							</div>
						)}
						<div className="events-title">
							<span>Events interested in</span>
						</div>
						<div className="event-list-container">
							{subscribeEvents.length === 0 ? (
								<div className="event-show-warning">No events yet</div>
							) : (
								this.renderEventList(subscribeEvents, null)
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		...props,
		currentUserId: state.profile.profileInfo.id,
		currentProfileUserId:
			state.profile.selectedProfileInfo && state.profile.selectedProfileInfo.id,
		currentUserRole: state.profile.profileInfo.role,
		userEvents: state.events.userEvents,
		setSpinner: state.events.setSpinner
	};
};

const mapDispatchToProps = dispatch => {
	const actions = {
		getUserEvents,
		saveEvent,
		deleteEvent,
		updateEvent
	};

	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserEvents);
