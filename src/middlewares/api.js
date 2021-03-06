import api from '../actions/config';
import handleErrors from '../actions/errorHandler';
import { logout, refreshToken, toggleLoginModal } from '../actions/';
import { isTokenExpired, tokenBelowRefreshThreshold } from '../utils/';

const UNAUTHORIZED = 'unauthorized';


function callApi(endpoint, httpMethod, authenticated, data) {
  const token = localStorage.getItem('token') || null;
  let config = {};
  if (authenticated) {
    if (token) {
      config = {
        headers: { Authorization: `JWT ${token}` },
      };
    } else {
      return Promise.reject(new Error(UNAUTHORIZED));
    }
  }

  const methodsWithPayload = ['put', 'post'];
  let rest = [];
  if (methodsWithPayload.includes(httpMethod)) {
    rest = [data, config];
  } else {
    rest = [config];
  }

  return api[httpMethod](endpoint, ...rest)
    .then(
      (response) => {
        if (httpMethod === 'delete' && !response.data) {
          return endpoint;
        }
        return response.data;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          return Promise.reject(new Error(UNAUTHORIZED));
        }
        return Promise.reject(error);
      },
    );
}

export const CALL_API = Symbol('Call API');


export default store => next => action => {
  const callAPI = action[CALL_API];

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, httpMethod, types, authenticated, data } = callAPI;

  const [requestType, successType, errorType] = types;

  // Passing the authenticated boolean back in out data will let us distinguish
  // between normal and secret quotes
  next({ type: requestType });
  return callApi(endpoint, httpMethod, authenticated, data)
    .then(
      response => next({ payload: response, type: successType }),
      (error) => {
        if (error.message === UNAUTHORIZED) {
          next(logout());
          next(toggleLoginModal(true, ['You have to log in to continue']));
        } else {
          const errors = handleErrors(error);
          next({
            payload: errors,
            type: errorType,
          });
        }
      },
    )
    .then((response) => {
      // refresh token if below threshbold
      if (!isTokenExpired() && tokenBelowRefreshThreshold()) {
        next(refreshToken());
      }
      return response;
    });
};
