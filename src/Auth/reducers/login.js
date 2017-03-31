const login = (
  state = {
    login: '',
    password: '',
    requesting: false,
    responseMessage: '',
    loginError: '',
    passwordError: ''
  },
  action
) => {
  switch(action.type) {
    case 'LOGIN_FORM_HANDLE_INPUT':
      return Object.assign({}, state, {
        [action.name]: action.value,
        responseMessage: ''
      });
    case 'LOGIN_FORM_HANDLE_REQUEST':
      return Object.assign({}, state, {
        requesting: true
      });
    case 'LOGIN_FORM_SUCCESS':
      return Object.assign({}, state, {
        login: '',
        password: '',
        requesting: false
      });
    case 'LOGIN_FORM_USER_ERROR':
      return Object.assign({}, state, {
        requesting: false,
        responseMessage: 'Login or password is incorrect',
        loginError: '',
        passwordError: ''
      });
    case 'LOGIN_FORM_SET_ERRORS':
      return Object.assign({}, state, {
        loginError: action.errors.login,
        passwordError: action.errors.password
      });
    default:
      return state;
  }
};

export default login;