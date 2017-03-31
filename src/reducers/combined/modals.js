import { combineReducers } from 'redux';
import createPlaceModal from '../../Map/reducers/createPlaceModal';
import createCommentModal from '../../Place/reducers/createCommentModal';
import addRatingModal from '../../Admin/reducers/addRatingModal';

const modals = combineReducers({
  createPlaceModal,
  createCommentModal,
  addRatingModal
});

export default modals;