const header = (
  state = {
    logged: false,
    login: '',
    menuOpen: false
  },
  action
) => {
  switch(action.type) {
    case 'HEADER_SET_USER_LOGGED':
      return Object.assign({}, state, {
        logged: true,
        login: action.login
      });
    case 'REGISTRATION_FORM_SUCCESS':
      return Object.assign({}, state, {
        logged: true,
        login: action.login
      });
    case 'LOGIN_FORM_SUCCESS':
      return Object.assign({}, state, {
        logged: true,
        login: action.login
      });
    case 'USER_LOG_OUT':
      return Object.assign({}, state, {
        logged: false,
        login: ''
      });
    case 'HEADER_TOGGLE_MENU':
      return Object.assign({}, state, {
        menuOpen: !state.menuOpen
      });
    default:
      return state;
  }
};

export default header;