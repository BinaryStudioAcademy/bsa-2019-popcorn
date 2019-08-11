import React, { Component }  from 'react';
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
    loadingElement: <div style={{ height: `300px`,width:'500px', position:'static' }} />,
    containerElement: <div style={{ height: `300px` ,width:'500px', position:'static', alignSelf:'center'}} />,
    mapElement: <div style={{ height: `300px`, position:'static' }} />,
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
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
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
