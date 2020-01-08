import { USER_PROFILE, PROFILE_FAILER } from '../actions/constant';
const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};
/**
 *
 * @param {*} state
 * @param {*} action
 */
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_FAILER:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
