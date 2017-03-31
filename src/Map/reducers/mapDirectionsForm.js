const mapDirectionsForm = (
  state = {
    origin: '',
    destination: ''
  },
  action
) => {
  switch(action.type) {
    case 'MAP_DIRECTIONS_FORM_HANDLE_INPUT':
      return Object.assign({}, state, {
        [action.name]: action.value
      });
    case 'MAP_DIRECTIONS_FORM_CLEAR':
      return Object.assign({}, state, {
        origin: '',
        destination: ''
      });
    default:
      return state;
  }
};

export default mapDirectionsForm;