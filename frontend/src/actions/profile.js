import axios from 'axios';
import { setAlert } from './alert';
import { USER_PROFILE, PROFILE_FAILER } from './constant';
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
          ? 'Your Profile has been updated'
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
