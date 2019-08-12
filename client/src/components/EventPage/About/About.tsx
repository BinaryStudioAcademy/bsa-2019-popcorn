import React, { useState } from 'react';
import Modal from 'react-responsive-modal';
import { IEvent } from '../EventPage';
import EventMap from '../EventMap';
import './About.scss';
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
                <Modal
                    open={locationMap}
                    onClose={() => setLocationMap(prevLocationMap => !prevLocationMap)}
                    showCloseIcon={false}
                    focusTrapped={false}
                    center
                    classNames={{
                        modal: 'modal-window'
                    }}
                >
                    <EventMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}`}
                        loadingElement={<div className="map-loading-elem" />}
                        containerElement={<div className="map-container" />}
                        mapElement={<div className="map-elem" />}
                    />
                    <button
                        className="modal-btn-close"
                        onClick={() => setLocationMap(prevLocationMap => !prevLocationMap)}
                    >
                        Close
                    </button>
                </Modal>
            </div>
            <div className="details">
                <FontAwesomeIcon className="icon" icon={faInfoCircle} />
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel culpa doloribus est provident dolorem expedita voluptatum. Explicabo, et nobis fuga soluta nulla laborum repellat accusamus quidem animi iure nostrum. Dicta?</span>
            </div>
        </div>
    );
}

export default About;