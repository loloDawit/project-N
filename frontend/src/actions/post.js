import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_FAILER } from './constant';

export const getUserPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: POST_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
