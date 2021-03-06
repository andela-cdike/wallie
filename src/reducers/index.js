import { combineReducers } from 'redux';

import auth from './authReducer/authReducer';
import post from './postReducer/postReducer';
import user from './userReducer/userReducer';

export default combineReducers({
  auth,
  post,
  user,
});
