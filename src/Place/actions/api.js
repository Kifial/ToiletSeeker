import api from '../../lib/api';

export const getPlaceInfo = id => dispatch => {
  api(`/protected/places/${id}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then(data => {
      dispatch({
        type: 'PLACE_SET_INFO',
        data
      });
    })
    .catch(error => {
      console.error('info was not provided');
    });
};

export const submitCreateComment = data => dispatch => {
  dispatch({
    type: 'CREATE_COMMENT_MODAL_REQUESTING'
  });
  api('/protected/comments', {
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
        type: 'CREATE_COMMENT_MODAL_SUCCESS',
        data
      });
    })
    .catch(error => {
      console.error('comment was not created');
    });
};

export const likeComment = id => dispatch => {
  dispatch({
    type: 'COMMENT_LIKED',
    id
  });
  api(`/protected/comments/${id}/likes`, {
    method: 'PATCH'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .catch(error => {
      console.error('comment was not liked');
    });
};

export const dislikeComment = id => dispatch => {
  dispatch({
    type: 'COMMENT_DISLIKED',
    id
  });
  api(`/protected/comments/${id}/dislikes`, {
    method: 'PATCH'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .catch(error => {
      console.error('comment was not disliked');
    });
};

export const removeLikeFromComment = id => dispatch => {
  dispatch({
    type: 'COMMENT_REMOVE_LIKE',
    id
  });
  api(`/protected/comments/${id}/likes`, {
    method: 'delete'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .catch(error => {
      console.error('comment was not unliked');
    });
};

export const removeDislikeFromComment = id => dispatch => {
  dispatch({
    type: 'COMMENT_REMOVE_DISLIKE',
    id
  });
  api(`/protected/comments/${id}/dislikes`, {
    method: 'delete'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .catch(error => {
      console.error('comment was not undisliked');
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
        type: 'PLACE_CHECK_IN_SUCCESS',
        data: data.time
      });
    })
    .catch(error => {
      console.error(error.message);
    });
};
