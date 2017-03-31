import api from '../../lib/api';

export const submitCreatePlace = data => dispatch => {
  dispatch({
    type: 'CREATE_PLACE_MODAL_REQUESTING'
  });
  api('/protected/places', {
    method: 'post',
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then(data => {
      dispatch({
        type: 'CREATE_PLACE_MODAL_SUCCESS'
      });
      dispatch({
        type: 'MAP_CREATE_PLACE',
        data
      });
    })
    .catch(error => {
      console.log('place was not created');
    });
};

export const getMarkers = map => dispatch => {
  api('/protected/places')
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then(data => {
      dispatch({
        type: 'MAP_SET_MARKERS',
        data,
        map
      });
    })
    .catch(error => {
      console.error('markers was not provided');
    });
};

export const checkIn = id => dispatch => {
  api(`/protected/places/${id}/checkin`, {
    method: 'PATCH'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('check in was not created');
      }
    })
    .then(data => {
      dispatch({
        type: 'MAP_CHECK_IN_SUCCESS',
        data: data.time
      });
    })
    .catch(error => {
      console.error(error.message);
    });
};