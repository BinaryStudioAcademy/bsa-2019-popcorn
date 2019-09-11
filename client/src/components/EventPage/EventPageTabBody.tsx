import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './About/About';
import ParticipantList from './ParticipantList/ParticipantList';
import {
	IEventFormatClient,
	IDiscussionUser
} from '../UserPage/UserEvents/UserEvents.service';
import DiscussionComponent from '../MovieSeriesPage/DiscussionComponent/DiscussionComponent';

interface IProps {
	mainPath: string;
	event: IEventFormatClient;
	currentUser: IDiscussionUser;
}
const INTERESTED_STATUS = 'interested';
const GOING_STATUS = 'going';

const EventPageTabBody: React.FC<IProps> = ({
	mainPath,
	event,
	currentUser
}) => {
	return (
		<div className={'event-page-tab-body'}>
			<Switch>
				<Route
					exact
					path={`${mainPath}`}
					component={() => <About event={event} />}
				/>
				<Route
					path={`${mainPath}/discussion`}
					render={() => (
						<div className="event-discussion">
							<DiscussionComponent
								messages={event.eventComments}
								currentUser={currentUser}
								entityId={event.id}
								entityIdName="eventId"
							/>
						</div>
					)}
				/>
				<Route
					path={`${mainPath}/participants`}
					render={() => (
						<ParticipantList
							participants={event.eventVisitors}
							status={GOING_STATUS}
						/>
					)}
				/>
				<Route
					path={`${mainPath}/interested`}
					render={() => (
						<ParticipantList
							participants={event.eventVisitors}
							status={INTERESTED_STATUS}
						/>
					)}
				/>
			</Switch>
		</div>
	);
};

export default EventPageTabBody;
