import React, { useState } from 'react';
import { IEvent } from '../EventPage';
import MapEvent from '../MapEvent';
import './About2.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClock,
    faMapMarker,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

interface IProps {
    event: IEvent
}

const MAP_API_KEY = 'AIzaSyD29w9W3OSEnII5bBNqhSxSSIWjrdgBdto';

const About: React.SFC<IProps> = ({ event }) => {
    const [locationMap, setLocationMap] = useState(false);

    return (
        <div className="about-event">
            <div className="date">
                <FontAwesomeIcon className="icon" icon={faClock} />
                <span>Субота, 24 серпня 2019 р. з 13:00 по 19:00</span>
            </div>
            <div className="location">
                <div className="location-info">
                    <div>
                        <FontAwesomeIcon className="icon" icon={faMapMarker} />
                        <span>Парк культури та відпочинку ім. Б. Хмельницького Парк культури та відпочинку ім. Б. Хмельницького</span>
                    </div>
                    <span
                        className="location-btn"
                        onClick={() => setLocationMap(prevLocationMap => !prevLocationMap)}
                    >
                        Show map
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
            <div className="details">
                <FontAwesomeIcon className="icon" icon={faInfoCircle} />
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel culpa doloribus est provident dolorem expedita voluptatum. Explicabo, et nobis fuga soluta nulla laborum repellat accusamus quidem animi iure nostrum. Dicta?</span>
            </div>
        </div>
    );
}

export default About;