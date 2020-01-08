import axios from 'axios';
import { setAlert } from './alert';
import { USER_PROFILE, PROFILE_FAILER } from './constant';

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
