export const setMarkersData = (map, data) => {
  let returnArr,
    position,
    bounds = new google.maps.LatLngBounds();
  returnArr = data.map(item => {
    position = new google.maps.LatLng(item.coords.lat, item.coords.lng);
    bounds.extend(position);
    return Object.assign({}, item, {
      showInfo: false
    })
  });
  if (returnArr.length !== 0) {
    map.fitBounds(bounds);
  }
  return returnArr;
};

export const setClosestMarkers = (directionPoints, markers) => {
  let i, length = directionPoints.length;
  return markers.filter(item => {
    for (i = 0; i < length; i += 1) {
      if (google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(item.coords.lat, item.coords.lng),
        directionPoints[i]
      ) <= 500) {
        return true;
      }
    }
    return false;
  });
};
//
// export const setCircles = (markers) => {
//   return markers.map(marker => {
//     return {
//       center: new google.maps.LatLng(marker.coords.lat, marker.coords.lng),
//       options: {
//         strokeColor: '#FF0000',
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: '#FF0000',
//         fillOpacity: 0.35
//       },
//       radius: 500
//     };
//   });
// };

export const setCurrentPosition = (position) => {
  return {
    center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
    options: {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    },
    radius: 100
  };
};

export const createDirection = (origin, destination) => dispatch => {
  let transformedOrigin = origin.split(', '),
    transformedDestination = destination.split(', ');
  transformedOrigin = new google.maps.LatLng(transformedOrigin[0], transformedOrigin[1]);
  transformedDestination = new google.maps.LatLng(transformedDestination[0], transformedDestination[1]);
  const DirectionsService = new google.maps.DirectionsService();
  DirectionsService.route({
    origin: transformedOrigin,
    destination: transformedDestination,
    travelMode: google.maps.TravelMode.DRIVING,
  }, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      dispatch({
        type: 'MAP_DIRECTIONS_FORM_CLEAR'
      });
      dispatch({
        type: 'MAP_MAKE_DIRECTION',
        direction: result
      });
    }
  });
};

export const handleMarkerClick = (marker, userPosition) => dispatch => {
  const userDistanceToMarker = google.maps.geometry.spherical.computeDistanceBetween(
    new google.maps.LatLng(marker.coords.lat, marker.coords.lng),
    new google.maps.LatLng(userPosition.lat, userPosition.lng)
  );
  if (userDistanceToMarker <= 100) {
    dispatch({
      type: 'MAP_ENABLE_CHECK_IN'
    });
  } else {
    dispatch({
      type: 'MAP_DISABLE_CHECK_IN'
    });
  }
  dispatch({
    type: 'MAP_SET_MARKER_DISTANCE_TO_USER',
    data: userDistanceToMarker,
    marker
  });
  dispatch({
    type: 'MAP_HANDLE_MARKER_CLICK',
    marker
  });
};

export const convertMarkerDistance = (distance) => {
  let result = distance,
    metricSys = 'm';
  if (distance >= 1000) {
    metricSys = 'km';
    result /= 1000;
  }
  return `${result.toFixed(2)}${metricSys} from you`;
};