import {
  USER_PROFILE,
  PROFILE_FAILER,
  USER_PROFILES,
  GITHUB_REPOS,
  REMOVE_PROFILE,
  UPDATE_PROFILE
} from '../actions/constant';
const initialState = {
  profile: null,
  profiles: [],
  gitrepos: [],
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
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case USER_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case GITHUB_REPOS:
      return {
        ...state,
        gitrepos: payload,
        loading: false
      };
    case PROFILE_FAILER:
      return {
        ...state,
        error: payload,
        loading: false, 
        profile:null
      };
    case REMOVE_PROFILE:
      return {
        ...state,
        profile: null,
        gitrepos: [],
        loading: false
      };
    default:
      return state;
  }
}
