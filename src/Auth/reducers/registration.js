const registration = (
  state = {
    login: '',
    password: '',
    confirmPassword: '',
    loginError: '',
    passwordError: '',
    confirmPasswordError: '',
    requesting: false,
    responseMessage: ''
  },
  action
) => {
  switch(action.type) {
    case 'REGISTRATION_FORM_HANDLE_INPUT':
      return Object.assign({}, state, {
        [action.name]: action.value,
        responseMessage: ''
      });
    case 'REGISTRATION_FORM_HANDLE_REQUEST':
      return Object.assign({}, state, {
        requesting: true
      });
    case 'REGISTRATION_FORM_SUCCESS':
      return Object.assign({}, state, {
        login: '',
        password: '',
        confirmPassword: '',
        requesting: false
      });
    case 'REGISTRATION_FORM_USER_EXISTS':
      return Object.assign({}, state, {
        requesting: false,
        responseMessage: 'User already exists'
      });
    case 'REGISTRATION_FORM_SET_ERRORS':
      return Object.assign({}, state, {
        loginError: action.errors.login,
        passwordError: action.errors.password,
        confirmPasswordError: action.errors.confirmPassword
      });
    default:
      return state;
  }
};

export default registration;