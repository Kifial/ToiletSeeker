import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

require('./index.scss');

const AuthButtons = (props) => {
  return (
    <div className="auth-buttons">
      <FlatButton
        label="Sign up"
        style={{
          position: 'relative',
          color: '#ffffff'
        }}>
        <Link to="/registration" className="auth-buttons__link" />
      </FlatButton>
      <FlatButton
        label="Sign in"
        style={{
          position: 'relative',
          margin: '0 10px 0',
          color: '#ffffff'
        }}>
        <Link to="/login" className="auth-buttons__link" />
      </FlatButton>
    </div>
  )
};

export default AuthButtons;