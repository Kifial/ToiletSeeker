import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  Circle
} from 'react-google-maps';
import { connect } from 'react-redux';
import { getMarkers } from '../../actions/api';
import { handleMarkerClick } from '../../actions/map';
import MarkerContent from '../MarkerContent/index.jsx';

require('./index.scss');

const propTypes = {
  markers: React.PropTypes.array,
  mapCenter: React.PropTypes.object,
  directionsActive: React.PropTypes.bool,
  directionsStep: React.PropTypes.number,
  directions: React.PropTypes.any,
  directionsCoords: React.PropTypes.array,
  userPosition: React.PropTypes.object
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.directionsFirstStep = this.directionsFirstStep.bind(this);
    this.directionsSecondStep = this.directionsSecondStep.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getMarkers(this._map));
    navigator.geolocation.getCurrentPosition(position => {
      this.props.dispatch({
        type: 'MAP_SET_CURRENT_POSITION',
        position
      });
    });
  }
  handleMapClick(e) {
    switch(this.props.directionsStep) {
      case 1:
        this.directionsFirstStep(e);
        break;
      case 2:
        this.directionsSecondStep(e);
        break;
      default:
        break;
    }
  }
  directionsFirstStep(e) {
    this.props.dispatch({
      type: 'MAP_DIRECTION_FIRST_STEP',
      coords: e.latLng
    });
  }
  directionsSecondStep(e) {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: this.props.directionsCoords[0],
      destination: e.latLng,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.props.dispatch({
          type: 'MAP_DIRECTION_SECOND_STEP',
          coords: e.latLng,
          direction: result
        });
      }
    });
  }
  handleMarkerClick(marker) {
    this.props.dispatch(handleMarkerClick(marker, this.props.userPosition));
  }
  handleMarkerClose(marker) {
    this.props.dispatch({
      type: 'MAP_HANDLE_MARKER_CLOSE',
      marker
    });
  }
  render() {
    return (
      <GoogleMap
        ref={(el) => this._map = el}
        defaultZoom={14}
        center={this.props.mapCenter}
        onClick={this.handleMapClick}
      >
        {this.props.markers.map(marker =>
          <Marker
            key={marker.id}
            id={marker.id}
            icon={'/assets/person-marker.svg'}
            position={marker.coords}
            onClick={() => this.handleMarkerClick(marker)}
          >
            {marker.showInfo && (
              <InfoWindow onCloseClick={() => this.handleMarkerClose(marker)}>
                <MarkerContent
                  id={marker.id}
                  name={marker.name}
                  tags={marker.tags}
                  vicinity={marker.vicinity}
                  distanceToUser={marker.distanceToUser}
                />
              </InfoWindow>
            )}
          </Marker>
        )}
        {this.props.directions &&
          <DirectionsRenderer directions={this.props.directions} />
        }
        {this.props.circles.map((circle, i) =>
          <Circle
            key={i}
            id={i}
            options={circle.options}
            center={circle.center}
            radius={circle.radius}
          />
        )}
      </GoogleMap>
    );
  }
}

Map.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    markers: state.map.markers,
    mapCenter: state.map.mapCenter,
    directionsActive: state.map.directionsActive,
    directionsStep: state.map.directionsStep,
    directions: state.map.directions,
    directionsCoords: state.map.directionsCoords,
    circles: state.map.circles,
    userPosition: state.map.userPosition
  }
};

Map = connect(
  mapStateToProps
)(Map);

const MyGoogleMap = withGoogleMap(props =>
  <Map />
);

export default MyGoogleMap;