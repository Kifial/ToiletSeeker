import api from '../../lib/api';

export const getPlaces = page => dispatch => {
  api(`/protected/admin/places/pages/${page}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then(data => {
      dispatch({
        type: 'ADMIN_SET_PLACES',
        data: data.places,
        pagination: data.pagination,
        page: data.page,
        pagesCount: data.pagesCount
      });
    })
    .catch(error => {
      console.error('admin places was not send');
    });
};

export const getUsers = page => dispatch => {
  api(`/protected/admin/users/pages/${page}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then(data => {
      dispatch({
        type: 'ADMIN_SET_USERS',
        data: data.users,
        pagination: data.pagination,
        page: data.page,
        pagesCount: data.pagesCount
      });
    })
    .catch(error => {
      console.error('admin users was not sended');
    });
};

export const getRatingFields = () => dispatch => {
  api('/protected/admin/ratingFields')
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then(data => {
      dispatch({
        type: 'ADMIN_SET_RATING_FIELDS',
        data: data.fields
      });
    })
    .catch(error => {
      console.error('admin rating fields was not provided');
    });
};

export const submitAddRatingField = data => dispatch => {
  dispatch({
    type: 'ADMIN_ADD_RATING_MODAL_REQUESTING'
  });
  api('/protected/admin/ratingFields', {
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
        type: 'ADMIN_ADD_RATING_MODAL_SUCCESS',
        data
      });
    })
    .catch(error => {
      console.error('admin rating field was not provided');
    });
};

export const deleteRatingFields = data => dispatch => {
  data.forEach(item => {
    api(`/protected/admin/ratingFields/${item.id}`, {
      method: 'delete'
    })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: 'ADMIN_DELETE_RATING_FIELDS',
            data: item.id
          });
        } else {
          throw new Error();
        }
      })
      .catch(error => {
        console.error('rating fields was not deleted');
      });
  });
};

export const deleteUserFields = data => dispatch => {
  data.forEach(item => {
    api(`/protected/admin/users/${item.login}`, {
      method: 'delete'
    })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: 'ADMIN_DELETE_USER',
            data: item.id
          });
        } else {
          throw new Error();
        }
      })
      .catch(error => {
        console.error('user was not deleted');
      });
  });
};

export const deletePlaceFields = data => dispatch => {
  data.forEach(item => {
    api(`/protected/admin/places/${item.id}`, {
      method: 'delete'
    })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: 'ADMIN_DELETE_PLACE',
            data: item.id
          });
        } else {
          throw new Error();
        }
      })
      .catch(error => {
        console.error('place was not deleted');
      });
  });
};