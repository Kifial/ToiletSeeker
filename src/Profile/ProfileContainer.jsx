import React from 'react';
import { connect } from 'react-redux';
import { getProfileInfo } from './actions/api';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

require('./main.scss');

const propTypes = {
  name: React.PropTypes.string,
  login: React.PropTypes.string,
  info: React.PropTypes.string,
  profileAvatar: React.PropTypes.string
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleStatistics = this.handleStatistics.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getProfileInfo(this.props.login));
  }
  handleEdit() {
    browserHistory.push('/profile/edit');
  }
  handleStatistics() {
    browserHistory.push('/profile/statistics');
  }
  render() {
    return (
      <Paper zDepth={1} style={{
        width: '800px',
        margin: '20px auto'
      }}>
        <div className="profile">
          <div className="profile__info-box">
            <div className="profile__name">{this.props.name}</div>
            <div className="profile__user-info">{this.props.info}</div>
            <div className="profile__buttons-row">
              <RaisedButton
                label="Edit"
                secondary={true}
                onClick={this.handleEdit}
              />
              <div className="profile__statistics-button-box">
                <RaisedButton
                  label="Statistics"
                  onClick={this.handleStatistics}
                />
              </div>
            </div>
          </div>
          <div className="profile__avatar-box">
            <div className="profile__avatar">
              <img src={this.props.profileAvatar} alt={this.props.name}/>
            </div>
          </div>
        </div>
      </Paper>
    )
  }
}

Profile.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    name: state.profile.name,
    login: state.header.login,
    info: state.profile.info,
    profileAvatar: state.profile.profileAvatar
  }
};

Profile = connect(
  mapStateToProps
)(Profile);

export default Profile;