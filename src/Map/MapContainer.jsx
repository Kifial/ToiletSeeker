import React from 'react';
import { connect } from 'react-redux';
import MyGoogleMap from './components/MyGoogleMap/index.jsx';

require('./main.scss');

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'MAP_HANDLE_UNMOUNT'
    });
  }
  render() {
    return (
      <div className="map-container">
        <MyGoogleMap
          containerElement={
            <div className="map" />
          }
          mapElement={
            <div className="map__body" />
          }
        />
        {this.props.children}
      </div>
    )
  }
}

MapContainer = connect()(MapContainer);

export default MapContainer;