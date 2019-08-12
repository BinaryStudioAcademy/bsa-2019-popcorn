import React from 'react';
import { IEvent } from './EventPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faEnvelope,
    faPlus
} from '@fortawesome/free-solid-svg-icons';

interface IProps {
    event: IEvent
}

const EventPageHeader: React.FC<IProps> = ({ event }) => {
    return (
        <header className="event-page-header">
            <div className="header-photo" style={{backgroundImage: `url(${event.photo})`}}></div>
            <div className="header-basic">
                <span className="header-title">{event.title}</span>
                <div className="header-meta-info">
                    <div className="meta-info-left">
                        <div className="meta-info-item">
                            <FontAwesomeIcon icon={faStar} />
                            <span className="meta-info-name">Interested</span>
                        </div>
                        <div className="meta-info-item">
                            <FontAwesomeIcon icon={faPlus} />
                            <span className="meta-info-name">Going</span>
                        </div>
                    </div>
                    <div className="meta-info-item">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span className="meta-info-name">Invite</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default EventPageHeader;