import React from 'react';
import { IEvent } from '../EventPage';

interface IProps {
    event: IEvent
}

const About: React.SFC<IProps> = ({ event }) => {
    return (
        <div className="about">
            <div className="meta-data">
                <div className="date-where">
                    <div className="date">
                        <span>{event.date}</span>
                    </div>
                    <div className="where">
                        <span>{event.location}</span>
                    </div>
                </div>
                <div className="guests">
                    <span className="guests-title">Guests</span>
                    <div className="guests-info">
                        <div className="interested">
                            <span>15</span>
                            <span>interested</span>
                        </div>
                        <div className="going">
                            <span>25</span>
                            <span>going</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="details">
                {event.description}
            </div>
        </div>
    );
}

export default About;