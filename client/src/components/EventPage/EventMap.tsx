import React from 'react';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from 'react-google-maps';

const MapEvent = withScriptjs(
	withGoogleMap(props => (
		<GoogleMap
			defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
			defaultZoom={13}
		>
			<Marker position={{ lat: 40.756795, lng: -73.954298 }} />
		</GoogleMap>
	))
);

export default MapEvent;
