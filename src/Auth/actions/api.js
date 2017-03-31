import api from '../../lib/api';
import { browserHistory } from 'react-router';

export const submitRegistration = data => dispatch => {
  dispatch({
    type: 'REGISTRATION_FORM_HANDLE_REQUEST'
  });
  api('/auth/registration', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
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
      localStorage.setItem('login', data.token);
      browserHistory.push('/');
      dispatch({
        type: 'REGISTRATION_FORM_SUCCESS',
        login: data.login
      });
    })
    .catch(error => {
      dispatch({
        type: 'REGISTRATION_FORM_USER_EXISTS'
      });
    });
};

export const submitLogin = data => dispatch => {
  dispatch({
    type: 'LOGIN_FORM_HANDLE_REQUEST'
  });
  api('/auth/login', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
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
      localStorage.setItem('login', data.token);
      browserHistory.push('/');
      dispatch({
        type: 'LOGIN_FORM_SUCCESS',
        login: data.login
      });
    })
    .catch(error => {
      dispatch({
        type: 'LOGIN_FORM_USER_ERROR'
      });
    });
};