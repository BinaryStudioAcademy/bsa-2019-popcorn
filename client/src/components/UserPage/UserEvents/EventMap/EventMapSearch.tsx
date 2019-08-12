import React from 'react';
import './EventMapSearch.scss';
/* eslint-disable no-undef */

const _ = require("lodash");

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div className='map-loading'/>,
    containerElement: <div className='map-container'/>,
    mapElement: <div className='map'/>,
  }),
  lifecycle({
    componentWillMount() {
      const refs: any = {}
      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        marker: [],
        defaultMarkerPosition: this.props.defaultMarkerPosition,
        onMapMounted: ref => {
          refs.map = ref;
        },
        onMarkerMounted: ref => {
          refs.marker = ref;
        },
        onPositionChanged: () => {
          const position = refs.marker.getPosition();
          this.props.onLocationChanged({lat: position.lat(), lng: position.lng()});
        },
        onMapClick: (e) => {
          refs.marker.position = e.latLng;
          refs.marker.position = e.latLng;
          this.setState({
            center: {
              lat: e.latLng.lat(), lng: e.latLng.lng()
            },
            marker: refs.marker
          });
          this.state.onPositionChanged();
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();
          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            marker: nextMarkers[0],
          });
          const position = refs.marker.getPosition();
          this.props.onLocationChanged({lat: position.lat(), lng: position.lng()});
          refs.map.fitBounds(bounds);
        },
      })
    },
    componentWillReceiveProps(nextProps) {
      if (Array.isArray(this.state.marker) && nextProps.defaultMarkerPosition) {
        this.setState({
          center: {
            ...nextProps.defaultMarkerPosition
          },
          defaultMarkerPosition: nextProps.defaultMarkerPosition,
        });
      }
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onChanged={props.onBoundsChanged}
    onClick={props.onMapClick}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Choose a event location..."
        className='search-box'
      />
    </SearchBox>
    <Marker 
          ref={props.onMarkerMounted}
          position={props.marker.position || props.defaultMarkerPosition} 
          draggable={true}
          onPositionChanged={props.onPositionChanged}
        />
  </GoogleMap>
});

export default MapWithASearchBox;
