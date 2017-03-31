import api from '../../lib/api';

export const checkUserAuth = () => dispatch => {
  const login = localStorage.getItem('login');
  if (login) {
    api('/auth')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then(data => {
        dispatch({
          type: 'HEADER_SET_USER_LOGGED',
          login: data.login
        });
      })
      .catch(error => {
        console.error('header info was not provided');
      });
  }
};