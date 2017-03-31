import React from 'react';

require('./index.scss');

const MapLoader = (props) => {
  return (
    <div className="map-loader">
      <div className="map-loader__loader">loading...</div>
    </div>
  )
};

export default MapLoader;