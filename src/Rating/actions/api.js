import api from '../../lib/api';

export const getRatingInfo = () => dispatch => {
  const login = localStorage.getItem('login');
  api('/protected/places/rating')
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('rating info was not provided');
      }
    })
    .then(data => {
      dispatch({
        type: 'RATING_SET_DATA',
        data
      });
    })
    .catch(error => {
      console.error(error.message);
    });
};