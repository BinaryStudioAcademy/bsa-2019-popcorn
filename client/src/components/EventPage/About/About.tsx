import React, { useState } from 'react';
import { IEvent } from '../EventPage';
import MapEvent from '../MapEvent';
import './About.scss';

interface IProps {
    event: IEvent
}

const MAP_API_KEY = 'AIzaSyD29w9W3OSEnII5bBNqhSxSSIWjrdgBdto';

const About: React.SFC<IProps> = ({ event }) => {
    const [locationMap, setLocationMap] = useState(false);

    return (
        <div className="about">
            <div className="meta-data">
                <div className="date-location">
                    <div className="date">
                        <span>{event.date}</span>
                    </div>
                    <div className="location">
                        <div className="location-title">
                            <span>{event.location}</span>
                            <span
                                className="location-btn-show"
                                onClick={() => setLocationMap(prevLocationMap => !prevLocationMap)}
                            >
                                show
                            </span>
                        </div>
                        {
                            locationMap ? (
                                <MapEvent
                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}`}
                                    loadingElement={<div className="map-loading-elem" />}
                                    containerElement={<div className="map-container" />}
                                    mapElement={<div className="map-elem" />}
                                />
                            ) : null
                        }
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