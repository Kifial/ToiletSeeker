import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { submitLogin } from '../../actions/api';

require('./index.scss');

const propTypes = {
  login: React.PropTypes.string,
  password: React.PropTypes.string,
  requesting: React.PropTypes.bool,
  responseMessage: React.PropTypes.string,
  loginError: React.PropTypes.string,
  passwordError: React.PropTypes.string
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleRequired = this.handleRequired.bind(this);
  }
  handleInput(e) {
    this.props.dispatch({
      type: 'LOGIN_FORM_HANDLE_INPUT',
      name: e.target.name,
      value: e.target.value
    });
  }
  handleRequired() {
    const errors = {
      login: '',
      password: ''
    };
    if (this.props.login === '') {
      errors.login = 'Login is required';
    }
    if (this.props.password === '') {
      errors.password = 'Password is required';
    }
    this.props.dispatch({
      type: 'LOGIN_FORM_SET_ERRORS',
      errors
    });
  }
  handleSubmit() {
    if (
      this.props.login !== '' &&
      this.props.password !== ''
    ) {
      this.props.dispatch(submitLogin({
        login: this.props.login,
        password: this.props.password
      }));
    } else {
      this.handleRequired();
    }
  }
  render() {
    return (
      <div className="login">
        <div className="login__form">
          <div className="login__title">Login</div>
          <div className="login__input-row">
            <input
              type="text"
              name="login"
              placeholder="Login"
              className="ui-input"
              value={this.props.login}
              onChange={this.handleInput}
            />
          </div>
          <div className="login__error">{this.props.loginError}</div>
          <div className="login__input-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="ui-input"
              value={this.props.password}
              onChange={this.handleInput}
            />
          </div>
          <div className="login__error">
            {this.props.passwordError}
            {this.props.responseMessage}
          </div>
          <div className="login__submit-row">
            <RaisedButton
              label={this.props.requesting ? 'Loading...' : 'Submit'}
              primary={true}
              style={{ display: 'inline-block' }}
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = propTypes;

const mapStateToProps = (state) => {
  const form = state.forms.login;
  return {
    login: form.login,
    password: form.password,
    requesting: form.requesting,
    responseMessage: form.responseMessage,
    loginError: form.loginError,
    passwordError: form.passwordError
  }
};

Login = connect(
  mapStateToProps
)(Login);

export default Login;