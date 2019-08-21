import React from 'react';
import { IEvent } from './EventPage';
import { Switch, Route } from 'react-router-dom';
import About from './About/About';
import Discussion from './Discussion/Discussion';
import ParticipantList from './ParticipantList/ParticipantList';
import { IEventFormatClient } from '../UserPage/UserEvents/UserEvents.service';

interface IProps {
	mainPath: string;
	event: IEventFormatClient;
}
const INTERESTED_STATUS = 'interested';
const GOING_STATUS = 'going';

const EventPageTabBody: React.SFC<IProps> = ({ mainPath, event }) => {
	return (
		<div className={'event-page-tab-body'}>
			<Switch>
				<Route
					exact
					path={`${mainPath}`}
					component={() => <About event={event} />}
				/>
				<Route path={`${mainPath}/discussion`} render={() => <Discussion />} />
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
