import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getProfileInfo, submitProfileChanges } from '../../actions/api';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const propTypes = {
  name: React.PropTypes.string,
  login: React.PropTypes.string,
  info: React.PropTypes.string,
  profileAvatar: React.PropTypes.string,
  avatarFile: React.PropTypes.any,
  editName: React.PropTypes.string,
  editInfo: React.PropTypes.string
};

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAvatarInput = this.handleAvatarInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getProfileInfo(this.props.login));
  }
  handleAvatarInput(e) {
    let objectUrl = URL.createObjectURL(e.target.files[0]);
    this.props.dispatch({
      type: 'PROFILE_HANDLE_AVATAR_INPUT',
      avatar: objectUrl,
      avatarFile: e.target.files[0]
    });
  }
  handleInput(e) {
    this.props.dispatch({
      type: 'PROFILE_EDIT_HANDLE_INPUT',
      name: e.target.name,
      value: e.target.value
    });
  }
  handleSubmit() {
    if (this.props.avatarFile) {
      this.props.dispatch(submitProfileChanges(this.props.login, {
        name: this.props.editName,
        info: this.props.editInfo,
        avatar: this.props.avatarFile
      }));
    } else {
      this.props.dispatch(submitProfileChanges(this.props.login, {
        name: this.props.editName,
        info: this.props.editInfo
      }));
    }
  }
  handleCancel() {
    browserHistory.push('/profile');
  }
  render() {
    return (
      <Paper zDepth={1} style={{
        width: '800px',
        margin: '20px auto'
      }}>
        <div className="profile">
          <div className="profile__info-box">
            <div className="profile__name">
              <input
                type="text"
                name="editName"
                placeholder="Type your name"
                value={this.props.editName}
                onChange={this.handleInput}
                autoFocus="true"
              />
            </div>
            <div className="profile__user-info">
              <textarea
                name="editInfo"
                placeholder="Type your personal info"
                value={this.props.editInfo}
                onChange={this.handleInput}
              />
            </div>
            <div className="profile__buttons-row">
              <RaisedButton
                label="Cancel"
                onClick={this.handleCancel}
                style={{
                  margin: '0 10px 0 0'
                }}
              />
              <RaisedButton
                label="Submit"
                primary={true}
                onClick={this.handleSubmit}
              />
            </div>
          </div>
          <div className="profile__avatar-box">
            <div className="profile__fake-avatar">
              <img src={this.props.profileAvatar} alt={this.props.name}/>
            </div>
            <input
              type="file"
              className="profile__file-input"
              onChange={this.handleAvatarInput}
            />
          </div>
        </div>
      </Paper>
    )
  }
}

EditProfile.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    name: state.profile.name,
    login: state.header.login,
    info: state.profile.info,
    profileAvatar: state.profile.profileAvatar,
    avatarFile: state.profile.avatarFile,
    editName: state.profile.editName,
    editInfo: state.profile.editInfo
  }
};

EditProfile = connect(
  mapStateToProps
)(EditProfile);

export default EditProfile;