import React from 'react';
import { IEvent } from './EventPage';
import { Switch, Route } from 'react-router-dom';
import About from './About/About';
import Discussion from './Discussion/Discussion';
import ParticipantList from './ParticipantList/ParticipantList';
import InterestedList from './InterestedList/InterestedList';
import { IEventFormatClient } from '../UserPage/UserEvents/UserEvents.service';

interface IProps {
	mainPath: string;
	event: IEventFormatClient;
}

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
					render={() => <ParticipantList participants={event.eventVisitors} />}
				/>
				<Route
					path={`${mainPath}/interested`}
					render={() => <InterestedList />}
				/>
			</Switch>
		</div>
	);
};

export default EventPageTabBody;
