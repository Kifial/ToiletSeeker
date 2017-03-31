import { browserHistory } from 'react-router';

export const logOut = () => dispatch => {
  localStorage.setItem('login', '');
  dispatch({
    type: 'USER_LOG_OUT'
  });
  browserHistory.push('/login');
};