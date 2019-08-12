import React from 'react';
import { IEvent } from './EventPage';
import { Switch, Route } from 'react-router-dom';
import About from './About/About';
import Discussion from './Discussion/Discussion';
import ParticipantList from './ParticipantList/ParticipantList';
import InterestedList from './InterestedList/InterestedList';

interface IProps {
    mainPath: string,
    event: IEvent
}

const EventPageTabBody: React.SFC<IProps> = ({ mainPath, event }) => {
    return (
        <div className={"event-page-tab-body"}>
            <Switch>
                <Route exact path={`${mainPath}`} component={() => <About event={event} />} />
                <Route path={`${mainPath}/discussion`} component={Discussion} />
                <Route path={`${mainPath}/participants`} component={ParticipantList} />
                <Route path={`${mainPath}/interested`} component={InterestedList} />
            </Switch>
        </div>
    );
};

export default EventPageTabBody;