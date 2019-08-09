import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserEventsEditor from './UserEventsEditor/UserEventsEditor';

const UserEvents: React.FC = () => {
    return (
        <div className="UserEvents">
            User Events
            <Switch>
                <Route path={'/user-page/events/editor'} component={UserEventsEditor}/>
                {/* <Route path={'/user-page/events'} component={UserEventsList}/> */}
            </Switch>
        </div>
    );
}

export default UserEvents;
