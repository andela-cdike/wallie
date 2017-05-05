import axios from 'axios';

import {
  REGISTER_USER_PENDING,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
} from '../types';

export function registerUserPending() {
  return { type: REGISTER_USER_PENDING };
}

export function registerUserFailed(response) {
  return { type: REGISTER_USER_FAILED, payload: response };
}

export function registerUserSuccess(data) {
  return { type: REGISTER_USER_SUCCESS, payload: data };
}

export function registerUser(userData) {
  return (dispatch) => {
    dispatch(registerUserPending());
    axios.post('http://localhost:8000/api/v1/accounts/auth/register/', userData)
      .then(
        response => dispatch(registerUserSuccess(response.data)),
        error => dispatch(registerUserFailed(error)),
      );
  };
}