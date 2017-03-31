const place = (
  state = {
    id: '',
    name: '',
    tags: '',
    comments: [],
    ratingFields: [],
    rating: '',
    coords: {},
    userCoords: {},
    checkIn: false,
    checkInSuccess: false,
    checkInSuccessMessage: ''
  },
  action
) => {
  switch(action.type) {
    case 'PLACE_SET_INFO':
      return Object.assign({}, state, {
        login: action.data.login,
        id: action.data.id,
        name: action.data.name,
        tags: action.data.tags,
        vicinity: action.data.vicinity,
        comments: action.data.comments,
        rating: action.data.rating || '',
        ratingFields: action.data.ratingFields.map(item => {
          return Object.assign({}, item, { value: 4 });
        }),
        coords: action.data.coords
      });
    case 'PLACE_SET_CURRENT_POSITION':
      let userCoords = {
        lat: action.coords.latitude,
        lng: action.coords.longitude
      };
      return Object.assign({}, state, {
        userCoords: userCoords,
        checkIn: action.checkIn
      });
    case 'CREATE_COMMENT_MODAL_SUCCESS':
      return Object.assign({}, state, {
        comments: [
          ...state.comments,
          action.data
        ]
      });
    case 'CREATE_COMMENT_MODAL_SELECT_CHANGE':
      return Object.assign({}, state, {
        ratingFields: state.ratingFields.map(item => {
          if (item.id === action.id) {
            return Object.assign({}, item, { value: action.value });
          }
          return item;
        })
      });
    case 'COMMENT_LIKED':
      return Object.assign({}, state, {
        comments: state.comments.map(item => {
          if (item.id === action.id) {
            return Object.assign({}, item, {
              liked: true,
              likes: item.likes + 1
            });
          } else {
            return item;
          }
        })
      });
    case 'COMMENT_DISLIKED':
      return Object.assign({}, state, {
        comments: state.comments.map(item => {
          if (item.id === action.id) {
            return Object.assign({}, item, {
              disliked: true,
              dislikes: item.dislikes + 1
            });
          } else {
            return item;
          }
        })
      });
    case 'COMMENT_REMOVE_LIKE':
      return Object.assign({}, state, {
        comments: state.comments.map(item => {
          if (item.id === action.id) {
            return Object.assign({}, item, {
              liked: false,
              likes: item.likes - 1
            });
          } else {
            return item;
          }
        })
      });
    case 'COMMENT_REMOVE_DISLIKE':
      return Object.assign({}, state, {
        comments: state.comments.map(item => {
          if (item.id === action.id) {
            return Object.assign({}, item, {
              disliked: false,
              dislikes: item.dislikes - 1
            });
          } else {
            return item;
          }
        })
      });
    case 'PLACE_CHECK_IN_SUCCESS':
      return Object.assign({}, state, {
        checkInSuccess: true,
        checkInSuccessMessage: action.data,
        checkIn: false
      });
    case 'PLACE_CLOSE_CHECK_IN_SNACKBAR':
      return Object.assign({}, state, {
        checkInSuccess: false,
        checkInSuccessMessage: ''
      });
    default:
      return state;
  }
};

export default place;