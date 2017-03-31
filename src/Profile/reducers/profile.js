import { browserHistory } from 'react-router';

const profile = (
  state = {
    name: '',
    info: '',
    profileAvatar: '',
    avatarFile: '',
    editName: '',
    editInfo: '',
    statistics: []
  },
  action
) => {
  switch(action.type) {
    case 'PROFILE_SET_INFO':
      return Object.assign({}, state, {
        name: action.data.name,
        info: action.data.info,
        profileAvatar: action.data.profileAvatar,
        editName: action.data.name,
        editInfo: action.data.info
      });
    case 'PROFILE_HANDLE_AVATAR_INPUT':
      return Object.assign({}, state, {
        profileAvatar: action.avatar,
        avatarFile: action.avatarFile
      });
    case 'PROFILE_EDIT_HANDLE_INPUT':
      return Object.assign({}, state, {
        [action.name]: action.value
      });
    case 'PROFILE_EDIT_SUCCESS':
      browserHistory.push('/profile');
       return Object.assign({}, state, {
         editInfo: '',
         editName: '',
         avatarFile: ''
       });
    case 'PROFILE_SET_STATISTICS':
      return Object.assign({}, state, {
        statistics: action.data
      });
    default:
      return state;
  }
};

export default profile;