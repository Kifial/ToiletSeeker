import { combineReducers } from 'redux';
import registration from '../../Auth/reducers/registration';
import login from '../../Auth/reducers/login';
import mapSearch from '../../Map/reducers/search';
import mapDirectionsForm from '../../Map/reducers/mapDirectionsForm';

const forms = combineReducers({
  registration,
  login,
  mapSearch,
  mapDirectionsForm
});

export default forms;