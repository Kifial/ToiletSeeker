import { combineReducers } from 'redux';
import forms from './combined/forms';
import modals from './combined/modals';
import header from '../Header/reducers/header';
import map from '../Map/reducers/map';
import place from '../Place/reducers/place';
import profile from '../Profile/reducers/profile';
import admin from '../Admin/reducers/admin';

export const app = combineReducers({
  forms,
  modals,
  header,
  map,
  place,
  profile,
  admin
});