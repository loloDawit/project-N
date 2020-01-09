import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_FAILER,
  LOGIN_FAILER,
  LOGIN_SUCCESS,
  LOGOUT,
  DELETE_ACCOUNT
} from '../actions/constant';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};
/**
 *
 * @param {*} state intialstate state for authenticating a user
 * @param {*} action action that's going to be dispacthed
 */
export default function(state = initialState, action) {
  // destructure the action and take the type and the payload
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS: // we get the token and we should be able to login the user
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token); // save the token in the localstorage
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL: // if its a fail, remove the token
    case LOGIN_FAILER:
    case AUTH_FAILER:
    case LOGOUT:
    case DELETE_ACCOUNT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    default:
      return state;
  }
}
