const createCommentModal = (
  state = {
    text: '',
    open: false,
    requesting: false,
    errors: {
      text: false
    }
  },
  action
) => {
  switch(action.type) {
    case 'CREATE_COMMENT_MODAL_OPEN':
      return Object.assign({}, state, {
        open: true
      });
    case 'CREATE_COMMENT_MODAL_CLOSE':
      return Object.assign({}, state, {
        open: false
      });
    case 'CREATE_COMMENT_MODAL_HANDLE_INPUT':
      return Object.assign({}, state, {
        [action.name]: action.value,
        errors: Object.assign({}, state.errors, {
          [action.name]: false
        })
      });
    case 'CREATE_COMMENT_MODAL_REQUESTING':
      return Object.assign({}, state, {
        requesting: true
      });
    case 'CREATE_COMMENT_MODAL_SUCCESS':
      return Object.assign({}, state, {
        text: '',
        open: false,
        requesting: false
      });
    case 'CREATE_COMMENT_MODAL_SET_ERRORS':
      return Object.assign({}, state, {
        errors: action.errors
      });
    default:
      return state;
  }
};

export default createCommentModal;