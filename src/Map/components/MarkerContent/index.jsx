import React from 'react';
import { Link } from 'react-router';
import { convertMarkerDistance } from '../../actions/map';

require('./index.scss');

const MarkerContent = (props) => {
  return (
    <div className="marker-content">
      <div className="marker-content__title">
        <Link to={`/place/${props.id}`}>{props.name}</Link>
      </div>
      <div className="marker-content__tags">{props.tags}</div>
      <div className="marker-content__distance-to-user">{convertMarkerDistance(props.distanceToUser)}</div>
      <div className="marker-content__vicinity">{props.vicinity}</div>
    </div>
  )
};

export default MarkerContent;