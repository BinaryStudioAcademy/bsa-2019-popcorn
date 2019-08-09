import React from 'react';
import { IEvent } from './EventPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faImage,
    faStar,
    faEnvelope,
    faPlus
} from '@fortawesome/free-solid-svg-icons';

interface IProps {
    event: IEvent
}

const EventPageHeader: React.FC<IProps> = ({ event }) => {
// const EventPageHeader: React.FC = () => {
    return (
        <header className="event-page-header">
            <FontAwesomeIcon className="header-photo" icon={faImage} />
            <div className="header-basic">
                <span className="header-title">{event.title}</span>
                <div className="header-meta-info">
                    <div className="meta-info-item">
                        <FontAwesomeIcon icon={faStar} />
                        <span className="meta-info-name">Interested</span>
                    </div>
                    <div className="meta-info-item">
                        <FontAwesomeIcon icon={faPlus} />
                        <span className="meta-info-name">Going</span>
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