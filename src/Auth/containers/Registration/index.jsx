import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { submitRegistration } from '../../actions/api';

require('./index.scss');

const propTypes = {
  login: React.PropTypes.string,
  password: React.PropTypes.string,
  confirmPassword: React.PropTypes.string,
  loginError: React.PropTypes.string,
  passwordError: React.PropTypes.string,
  confirmPasswordError: React.PropTypes.string,
  requesting: React.PropTypes.bool,
  responseMessage: React.PropTypes.string
};

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
    this.handleRequiredFields = this.handleRequiredFields.bind(this);
    this.setFormErrors = this.setFormErrors.bind(this);
  }
  handleInput(e) {
    this.props.dispatch({
      type: 'REGISTRATION_FORM_HANDLE_INPUT',
      name: e.target.name,
      value: e.target.value
    });
  }
  handleSubmit() {
    if (
      this.props.login !== ''
      && this.props.password !== ''
      && this.props.confirmPassword !== ''
      && !this.hasErrors()
    ) {
      this.props.dispatch(submitRegistration({
        login: this.props.login,
        password: this.props.password
      }));
    } else {
      this.handleRequiredFields();
    }
  }
  validateInput() {
    let errors = {
      login: '',
      password: '',
      confirmPassword: ''
    };
    if (!this.props.login.match(/^\w{4,12}$/gi) && this.props.login !== '') {
      errors.login = 'Login must be at least 4 characters length';
    }
    if (!this.props.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,16}$/gi) && this.props.password !== '') {
      errors.password = 'Password must be at least 6 characters length with 1 letter and 1 number';
    }
    if ((this.props.password !== this.props.confirmPassword) && this.props.confirmPassword !== '') {
      errors.confirmPassword = 'Passwords are different';
    }
    this.setFormErrors(errors);
  }
  handleRequiredFields() {
    let errors = {
      login: this.props.loginError,
      password: this.props.passwordError,
      confirmPassword: this.props.confirmPasswordError
    };
    if (this.props.login === '') {
      errors.login = 'Login is required';
    }
    if (this.props.password === '') {
      errors.password = 'Password is required';
    }
    if (this.props.confirmPassword === '') {
      errors.confirmPassword = 'Password confirm is required';
    }
    this.setFormErrors(errors);
  }
  hasErrors() {
    if (
      this.props.loginError === ''
      && this.props.passwordError === ''
      && this.props.confirmPasswordError === ''
    ) {
      return false;
    } else {
      return true;
    }
  }
  setFormErrors(errors) {
    this.props.dispatch({
      type: 'REGISTRATION_FORM_SET_ERRORS',
      errors
    });
  }
  render() {
    return (
      <div className="registration">
        <div className="registration__form">
          <div className="registration__title">Registration</div>
          <div className="registration__input-row">
            <input
              type="text"
              name="login"
              placeholder="Login"
              className="ui-input"
              value={this.props.login}
              onChange={this.handleInput}
              onBlur={this.validateInput}
            />
          </div>
          <div className="registration__error">{this.props.loginError}</div>
          <div className="registration__input-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="ui-input"
              value={this.props.password}
              onChange={this.handleInput}
              onBlur={this.validateInput}
            />
          </div>
          <div className="registration__error">{this.props.passwordError}</div>
          <div className="registration__input-row">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              className="ui-input"
              value={this.props.confirmPassword}
              onChange={this.handleInput}
              onBlur={this.validateInput}
            />
          </div>
          <div className="registration__error">{this.props.confirmPasswordError}</div>
          <div className="registration__message-row">
            {this.props.responseMessage}
          </div>
          <div className="registration__submit-row">
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

Registration.propTypes = propTypes;

const mapStateToProps = (state) => {
  const form = state.forms.registration;
  return {
    login: form.login,
    password: form.password,
    confirmPassword: form.confirmPassword,
    loginError: form.loginError,
    passwordError: form.passwordError,
    confirmPasswordError: form.confirmPasswordError,
    requesting: form.requesting,
    responseMessage: form.responseMessage
  }
};

Registration = connect(
  mapStateToProps
)(Registration);

export default Registration;