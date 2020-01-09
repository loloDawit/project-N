import axios from 'axios';
import { setAlert } from './alert';
import {
  USER_PROFILE,
  PROFILE_FAILER,
  USER_PROFILES,
  UPDATE_PROFILE,
  GITHUB_REPOS,
  DELETE_ACCOUNT,
  REMOVE_PROFILE
} from './constant';
/**
 *
 */
export const getUserProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/profile/self');
    dispatch({
      type: USER_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 *
 */
export const getAllUserProfile = () => async dispatch => {
  // dispatch({
  //   type: REMOVE_PROFILE
  // });
  try {
    const res = await axios.get('/api/v1/profile');
    dispatch({
      type: USER_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 *
 */
export const getUserProfileById = user_id => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/profile/user/${user_id}`);
    dispatch({
      type: USER_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 *
 */
export const getUserGitHubRepo = git_username => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/profile/github/${git_username}`);
    dispatch({
      type: GITHUB_REPOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 *
 * @param {*} formData
 * @param {*} history
 * @param {*} isEdited
 */
export const createUserProfile = (
  formData,
  history,
  isEdited = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/v1/profile', formData, config);
    dispatch({
      type: USER_PROFILE,
      payload: res.data
    });
    dispatch(
      setAlert(
        isEdited
          ? 'Your profile has been updated'
          : 'Your profile has been created',
        'success'
      )
    );
    if (!isEdited) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 *
 * @param {*} formData
 * @param {*} history
 */
export const addUserExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put('/api/v1/profile/experience', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Experience has been added to your profile.', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 *
 * @param {*} formData
 * @param {*} history
 */
export const addUserEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put('/api/v1/profile/education', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Education has been added to your profile.', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 *
 * @param {*} exp_id
 */
export const deleteUserExperience = exp_id => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/profile/experience/${exp_id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(
      setAlert('Experience has been removed from your profile.', 'success')
    );
  } catch (err) {
    dispatch({
      type: PROFILE_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 *
 * @param {*} exp_id
 */
export const deleteUserEducation = edu_id => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/profile/education/${edu_id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(
      setAlert('Education has been removed from your profile.', 'success')
    );
  } catch (err) {
    dispatch({
      type: PROFILE_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

/**
 *
 * @param {*} exp_id
 */
export const deleteUserAccount = () => async dispatch => {
  if (
    window.confirm(
      'Hey, Are you sure you want to DELETE your account? This can not be UNDONE!!'
    )
  ) {
    try {
      await axios.delete('/api/v1/profile');
      dispatch({
        type: REMOVE_PROFILE
      });
      dispatch({
        type: DELETE_ACCOUNT
      });
      dispatch(setAlert('Your has been deleted.'));
    } catch (err) {
      dispatch({
        type: PROFILE_FAILER,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
