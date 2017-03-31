import api from '../../lib/api';

export const getProfileInfo = userLogin => dispatch => {
  if (userLogin === '') {
    userLogin = 'placeholder';
  }
  api(`/protected/users/${userLogin}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then(data => {
      dispatch({
        type: 'PROFILE_SET_INFO',
        data
      });
    })
    .catch(error => {
      console.error('profile info was not got');
    });
};

export const submitProfileChanges = (userLogin, data) => dispatch => {
  const login = localStorage.getItem('login');
  let fd = new FormData();
  for (let name in data) {
    if (data.hasOwnProperty(name)) {
      fd.append(name, data[name]);
    }
  }
  api(`/protected/users/${userLogin}`, {
    method: 'put',
    headers: {
      'Authorization': `Bearer ${login}`
    },
    body: fd
  })
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: 'PROFILE_EDIT_SUCCESS'
        });
      } else {
        throw new Error();
      }
    })
    .catch(error => {
      console.error('profile was not updated');
    });
};

export const getStatistics = userLogin => dispatch => {
  api(`/protected/users/${userLogin}/statistics`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('statistics was not provided');
      }
    })
    .then(data => {
      dispatch({
        type: 'PROFILE_SET_STATISTICS',
        data: data.items
      });
    })
    .catch(error => {
      console.error(error.message);
    });
};