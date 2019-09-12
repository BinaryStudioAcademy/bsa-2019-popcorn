import * as React from 'react';
import ReactMapboxGl, { Marker, Feature, Layer } from 'react-mapbox-gl';
import styled from 'styled-components';
import Dropdown from './dropdown';
import './Map.scss';

// tslint:disable-next-line:no-var-requires
const { token, styles } = require('./config.json');
const geocodingUrl = 'https://api.mapbox.com/geocoding/v5';
// tslint:disable-next-line:max-line-length
const mapboxGeocoding = (query: string) =>
	`${geocodingUrl}/mapbox.places/${query}.json?access_token=${token}`;

const Container = styled.div`
	position: relative;
	height: 100%;
	flex: 1;
`;

const Mark = styled.div`
	background-color: #e74c3c;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	border: 4px solid #eaa29b;
`;

const Map = ReactMapboxGl({ accessToken: token });

const mapStyle = {
	width: '100%',
	height: '100%'
};
const POSITION_CIRCLE_PAINT = {
	'circle-stroke-width': 4,
	'circle-radius': 10,
	'circle-blur': 0.15,
	'circle-color': '#3770C6',
	'circle-stroke-color': 'white'
};

export interface IPlace {
	id: string;
	name: string;
	center: [number, number];
}

export interface IState {
	query: string;
	options: IPlace[];
	selected?: IPlace;
	center?: [number, number];
}

const req = (url: string, body?: any, method = 'GET') =>
	new Request(url, {
		method,
		headers: new Headers({
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'Accept-Charset': 'utf-8'
		}),
		body
	});

export interface IProps {
	// tslint:disable-next-line:no-any
	onLocationChanged?: (newCord: { lat: number; lng: number }) => void;
	currentLocation?: { lat: number | undefined; lng: number | undefined } | null;
	readOnly?: boolean;
}

class MapComponent extends React.Component<IProps, IState> {
	public state: IState = {
		query: '',
		options: [],
		selected: undefined,
		center: undefined
	};

	private fetch = (query: string) => {
		fetch(req(mapboxGeocoding(query)))
			.then((res: any) => res.json())
			.then((data: any) => {
				this.setState({
					options: data.features.map((poi: any) => ({
						id: poi.id,
						center: poi.center,
						name: poi.text
					}))
				});
			});
	};

	private onSelectItem = (index: number) => {
		const selected = this.state.options[index];
		const [lng, lat] = selected.center;
		if (this.props.onLocationChanged)
			this.props.onLocationChanged({ lng, lat });
		this.setState({
			selected,
			center: selected.center
		});
	};

	private onSearch = (query: string) => {
		this.setState({ query });
		this.fetch(query);
	};

	private onDragEnd = (event: any) => {
		if (this.props.onLocationChanged)
			this.props.onLocationChanged(event.lngLat);
	};

	private onMapClick = (map: any, event: any) => {
		if (this.props.readOnly) {
			return;
		}
		if (event) {
			if (this.props.onLocationChanged)
				this.props.onLocationChanged(event.lngLat);
			this.setState({
				selected: {
					id: '1',
					center: [event.lngLat.lng, event.lngLat.lat],
					name: 'custom marker'
				},
				center: [event.lngLat.lng, event.lngLat.lat]
			});
		}
	};

	public render() {
		const { options, selected, center } = this.state;

		let currentLocation;
		if (this.props.currentLocation)
			if (this.props.currentLocation.lat && this.props.currentLocation.lng)
				currentLocation = [
					this.props.currentLocation.lng,
					this.props.currentLocation.lat
				];

		return (
			<Container>
				{this.props.onLocationChanged && (
					<Dropdown
						onSearch={this.onSearch}
						onSelectItem={this.onSelectItem}
						options={options}
					/>
				)}
				<Map
					style={styles.outdoor}
					containerStyle={mapStyle}
					center={center || currentLocation || [30, 50]}
					onClick={this.onMapClick}
				>
					{(selected && (
						<Layer
							type="circle"
							id="position-marker"
							paint={POSITION_CIRCLE_PAINT}
						>
							<Feature
								coordinates={selected.center}
								draggable={true}
								onDragEnd={this.onDragEnd}
							/>
						</Layer>
					)) ||
						(currentLocation && (
							<Layer
								type="circle"
								id="position-marker"
								paint={POSITION_CIRCLE_PAINT}
							>
								<Feature
									coordinates={currentLocation}
									draggable={!this.props.readOnly}
									onDragEnd={this.onDragEnd}
								/>
							</Layer>
						))}
				</Map>
			</Container>
		);
	}
}

export default MapComponent;
