const addRatingModal = (
  state = {
    open: false,
    text: '',
    requesting: false,
    errors: {
      text: ''
    }
  },
  action
) => {
  switch(action.type) {
    case 'ADMIN_ADD_RATING_MODAL_OPEN':
      return Object.assign({}, state, {
        open: true
      });
    case 'ADMIN_ADD_RATING_MODAL_CLOSE':
      return Object.assign({}, state, {
        open: false
      });
    case 'ADMIN_ADD_RATING_MODAL_HANDLE_INPUT':
      return Object.assign({}, state, {
        [action.name]: action.value,
        errors: Object.assign({}, state.errors, {
          [action.name]: false
        })
      });
    case 'ADMIN_ADD_RATING_MODAL_REQUESTING':
      return Object.assign({}, state, {
        requesting: true
      });
    case 'ADMIN_ADD_RATING_MODAL_SUCCESS':
      return Object.assign({}, state, {
        open: false,
        text: '',
        requesting: false
      });
    case 'ADMIN_ADD_RATING_MODAL_SET_ERRORS':
      return Object.assign({}, state, {
        errors: action.errors
      });
    default:
      return state;
  }
};

export default addRatingModal;