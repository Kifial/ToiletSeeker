const search = (
  state = {
    text: '',
    data: []
  },
  action
) => {
  switch(action.type) {
    case 'MAP_SET_MARKERS':
      return Object.assign({}, state, {
        data: action.data.markers.map(marker => {
          return marker.vicinity;
        })
      });
    case 'MAP_SEARCH_HANDLE_INPUT':
      return Object.assign({}, state, {
        text: action.value
      });
    case 'MAP_SEARCH_HANDLE_REQUEST':
      return Object.assign({}, state, {
        text: action.value
      });
    case 'MAP_CREATE_PLACE':
      return Object.assign({}, state, {
        data: [
          ...state.data,
          action.data.vicinity
        ]
      });
    default:
      return state;
  }
};

export default search;